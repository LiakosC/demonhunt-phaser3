import { BasicScene } from "./BasicScene";

export class MenuScene extends BasicScene {

    constructor() {
        super(BasicScene.SCENE_menu);
        this.chosenEpisode = 0; // Set here before loading the levels page.
    }

    create() {
        //boot.createKeys();
		this.add.sprite(0, 0, "menu-image");
		this.buttonHoverSound = this.add.audio("button-hover");
		if (MENU_MUSIC) {
			this.music = this.add.audio("menu-music", 1, true);
			this.music.play();
		}
		
		this.box = $("<div>").addClass("menuBox").appendTo(htmlbox)[0];
		//this.box.innerHTML = '<div id="innerDiv"></div>';
		
		this.BK = new Book();
		this.BK.pageStart("main", function() {
			console.log("book main");
			$(this.box).addClass("main").html('\
				<button>Profiles</button>\
				<button>Options</button>\
				<button>Cinematic</button>\
				<button>Exit</button>\
			');
			$(this.box).find("button").eq(0).on("click", function() {this.BK.start("profiles");});
			$(this.box).find("button").eq(1).on("click", function() {this.BK.start("options");});
			$(this.box).find("button").eq(2).on("click", function() {cinematic.start();});
			$(this.box).find("button").eq(3).on("click", function() {exit();});
			$(this.box).find("button").on("mouseover", function() {this.buttonHoverSound.play();});
			this.BK.pageEnd("main", function() {
				$(this.box).removeClass("main").html('');
			});
		});
		
		// PROFILES
		this.BK.pageStart("profiles", function() {
			$(this.box).addClass("profiles").html('\
			<div class="list">\
				<div></div>\
			</div>\
			<div class="buttons">\
				<div>\
					<button>Load</button>\
					<button disabled>New</button>\
					<button disabled>Delete</button>\
				</div>\
			</div>\
			<div class="back">\
				<button>Back</button>\
			</div>\
			');
			var list = $(this.box).find(".list > div")[0];
			var insertProfile = function(name) {
				var prof = $("<div>").addClass("profile").html(name).on("mousedown", function() {
					var profiles = list.querySelectorAll(".profile");
					for (var i=0; i<profiles.length; i++) {
						profiles[i].classList.remove("selected");
					}
					prof.classList.add("selected");
				}).appendTo(list)[0];
			}
			for (var profileName in memory.data.profiles) {
				insertProfile(profileName);
				//console.log(prof);
			}
			
			// Load button
			$(this.box).find(".buttons button").eq(0).on("click", function() {
				var selected = list.querySelector(".selected");
				if (selected != null) {
					var profileName = selected.innerHTML;
					boot.SetProfile(profileName);
					//memory.profile = profileName;
					console.log("Profile selected: ", boot.profileMemoryData);
					this.BK.start("episodes");
				}
			});
			$(this.box).find(".back button").on("click", function() {this.BK.start("main");});
			this.BK.pageEnd("profiles", function() {
				$(this.box).removeClass("profiles").html('');
			});
		});
		
		this.BK.pageStart("options", function() {
			$(this.box).addClass("options").html('\
				<div>Movement: A D</br>Attack: Left/Right arrows</br>Jump: W</br>Action: Spacebar</br>Speak: Enter</div>\
				<div class="back"><button>Back</button></div>\
			');
			$(this.box).find("button").eq(0).on("click", function() {this.BK.start("main");});
			$(this.box).find("button").on("mouseover", function() {this.buttonHoverSound.play();});
			this.BK.pageEnd("options", function() {
				$(this.box).removeClass("options").html('');
			});
		});
		

		// EPISODES
		var choose_episode = -1;
		this.BK.pageStart("episodes", function() {
			// before it starts, the profile data must be saved in boot.profileMemoryData (string). boot.SetProfile(profileName)
			$(this.box).addClass("episodes").html('\
				<div><button>Trapped in Darkness</button></div>\
				<div><button disabled="true">Blade of Souls</button></div>\
				<div><button disabled="true">Archangel Betrayal</button></div>\
				<div><button disabled="true">Apocalypse of the One</button></div>\
				<div class="back"><button>Back</button></div>\
			');
			$(this.box).find("button").eq(0).on("click", function() { // ep 1
				this.StartPage_levels(1);
			});
			$(this.box).find("button").eq(-1).on("click", function() { // back
				this.BK.start("profiles");
			});
			this.BK.pageEnd("episodes", function() {
				$(this.box).removeClass("episodes").html('');
			});
		});
		
		this.BK.pageStart("levels", function() {
			// befure it starts, var choose_episode is edited (first is 1)
			// knows about choose_episode
			$(this.box).addClass("levels").html('\
				<div class="choosealevel">\
					<div class="artifacts"></div>\
					<div class="levels"></div>\
				</div>\
				<div class="back"><button>Back</button></div>\
			');
			$(this.box).find("button").eq(-1).on("click", function() {this.BK.start("episodes");});
			
			var choose_episode = this.chosenEpisode;
			var profileData = boot.profileMemoryData;
			var episodeData = profileData.episodes[choose_episode]; // episode
			
			/* artifacts div */
			
			var ar_box = $(this.box).find(".choosealevel .artifacts")[0];
			var ar_count = 0; for (var artifactKey in episodeData["artifacts"]) {ar_count++;}
			//console.log("artifacts count", ar_count);
			var dx = ar_box.offsetWidth / (ar_count + 1);
			var h = ar_box.offsetHeight;
			var innerH = h * 0.9;
			var y = (h - innerH) / 2;
			var top = y;
			var size = innerH;
			console.log(episodeData);
			var artifactsScan_i = 0;
			for (var artifactName in episodeData.artifacts) {
			//for (var i=0; i<episodeData.artifacts.length; i++) {
				console.log("artifactName", artifactName);
				if (episodeData.artifacts[artifactName] == true) {
					var file = artifactName;
				} else {
					var file = "unknown";
				}
				var left = dx*(artifactsScan_i+1) - size/2;
				//console.log(left, top, dx);
				var div = $("<div>").addClass("artifact").css({
					position:"absolute",
					left: left/ar_box.offsetWidth*100+"%",
					top: top/ar_box.offsetHeight*100+"%",
					width: size/ar_box.offsetWidth*100+"%",
					height: size/ar_box.offsetHeight*100+"%",
					background: "1cyan"
				}).appendTo(ar_box)[0];
				var img = document.createElement("img");
				img.FUCK_artifactName = file;
				img.src = GRAPHICS_ROOT+'/artifacts/'+file+'.png';
				var artifactMouse = function(img, name) {
					img.addEventListener("mouseover", function() {
						var info = $(this.box).find(".choosealevel .artifact_info").show()[0];
						info.innerHTML = name; // artifact name
					});
					img.addEventListener("mouseout", function() {
						var info = $(this.box).find(".choosealevel .artifact_info").hide()[0];
					});
				}
				if (episodeData.artifacts[artifactName] == true) {
					img.classList.add("taken");
					artifactMouse(img, artifactName);
				}
				div.appendChild(img);
				//html_artifacts += '<td><img src="'+GRAPHICS_ROOT+'/artifacts/'+file+'.png"/></td>';
				//console.log(ar);
				artifactsScan_i++;
			}
			//html_artifacts += '</tr></table>';
			//$(this.box).find(".choosealevel .artifacts")[0].innerHTML = html_artifacts;
			
			/* levels buttons div */
			
			var levelsCount;
			for (var levelKey in episodeData.levels) {levelsCount++;}
			
			// Grid IDEA!!!
			var createLevelButton = function(parent, levelKey) {
				var parentWidth = parent.offsetWidth;
				var parentHeight = parent.offsetHeight;
				var maxCols = 4;
				var size = parentWidth*0.85 / maxCols;
				var space_wall = 10;
				var spaceX = (parent.offsetWidth - size*maxCols - 2*space_wall) / (maxCols-1);
				var spaceY = 10;
				//console.log(parentWidth, parentHeight);
				var n = levelKey - 1;
				var j = parseInt(n/maxCols); // j: [0,1,2..)
				var i = n - j*maxCols;
				var x = space_wall + (spaceX * i) + i*size;
				var y = space_wall + (spaceY * j) + j* size;
				//console.log(levelKey);
				//console.log(n, i, j, x, y);
				
				var btn = $("<button>").html(levelKey).addClass("level").css({
					position: "absolute",
					left: x / parentWidth * 100 + "%",
					top: y / parentHeight * 100 + "%",
					width: size / parentWidth * 100 + "%",
					height: size / parentHeight * 100 + "%",
					margin: "0px",
				})[0];
				
				//position:"absolute",
				//left: left/ar_box.offsetWidth*100+"%",
				//top: top/ar_box.offsetHeight*100+"%",
				//width: size/ar_box.offsetWidth*100+"%",
				//height: size/ar_box.offsetHeight*100+"%",
				//background:"1cyan"
				
				
				var previousLevelData = profileData["episodes"][choose_episode]["levels"][levelKey-1]; // or null
				var currentLevelData = profileData["episodes"][choose_episode]["levels"][levelKey]; // or null

				if (levelKey == 1) {
					btn.disabled = false;
				} else if (levelKey > 1) {
					if (previousLevelData.completed == true)
						btn.disabled = false;
					else if (previousLevelData.completed == false)
						btn.disabled = true;
				}
				
				btn.addEventListener("click", function() {
					this.runGame(choose_episode, levelKey);
				});
				btn.addEventListener("mouseover", function() {
					if (currentLevelData.completed) {
						var info = $(this.box).find(".choosealevel .info").show()[0];
						var goldElement = info.querySelector(".text");
						//var goldMax = boot.episodes[choose_episode]["levels"][levelKey].getTotalGold();
						goldMax = boot.profileMemoryData.episodes[choose_episode].levels[levelKey].goldMax;
						goldElement.innerHTML = currentLevelData["gold"] + " / " + goldMax;
					}
				});
				btn.addEventListener("mouseout", function() {
					$(this.box).find(".choosealevel .info").hide();
				});
				
				parent.appendChild(btn);
				return btn;
			}
			
			var box = $(this.box).find(".choosealevel .levels")[0];
			for (var levelKey in episodeData.levels) {
				var btn = createLevelButton(box, levelKey);
			}
			
			/* hover */
			var gold = $("<div>").addClass("info").html('\
				<div class="image"><img src="'+GRAPHICS_ROOT+'/gold.png"/></div>\
				<div class="text">0/25</div>\
			').hide().appendTo(box);
			
			var artifact_info = $("<div>").addClass("artifact_info").html('\
				\
			').hide().appendTo(box);
			
			
			
			this.BK.pageEnd("levels", function() {
				$(this.box).removeClass("levels").html('');
			});
		});
		
		this.callback();
    }

    update() {
        this.ResizeCanvas();
    }
    
	shutdown() {
		if (this.music != null) {
			this.music.destroy();
			this.music = null;
		}
		this.BK.end();
		this.box.parentNode.removeChild(this.box);
	}

    StartPage_levels(episodeKey) {
        if (episodeKey == undefined) throw "episodeKey " + episodeKey;
        this.chosenEpisode = 1;
        this.BK.start("levels");
    }

    runGame(episode, level) {
        var episode = Number(episode); // somehow something is saved as string
        var level = Number(level);
        game.start(episode, level);
        //console.log(episode, level);
    }

}
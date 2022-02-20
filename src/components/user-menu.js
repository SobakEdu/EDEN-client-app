 AFRAME.registerComponent("user-menu", {
  init() {
    this.el.visible = false;
    this.phrazeArray = ["Hello!", "Sava, look at this!", "Natan krasavchik"];
    this.stateIndex = 0;

    this.rightButton = this.el.querySelector(".user-right-button");
    this.leftButton = this.el.querySelector(".user-left-button");
    this.text = this.el.querySelector(".user-menu-text");

    this.checkArrows = () => {
      if (this.stateIndex == 0) {
        this.leftButton.object3D.visible = false;
      } else if (this.stateIndex == this.phrazeArray.length - 1) {
        this.rightButton.object3D.visible = false;
      } else {
        this.leftButton.object3D.visible = true;
        this.rightButton.object3D.visible = true;
      }
    };
    // TO-DO 
    // Additional argument : number of slide
    // this.createNewState = (text) => {
    //   this.phrazeArray.push(text);
    // };

    this.updateView = () => {
      this.text.components.text.data.value = this.phrazeArray[this.stateIndex];
      this.text.components.text.update(this.text.components.text.data);
      this.checkArrows();
    };

    this.nextState = () => {
      if (this.stateIndex < this.phrazeArray.length - 1) {
        ++this.stateIndex;
        this.updateView();
      }
    };

    this.prevState = () => {
      if (this.stateIndex >= 1) {
        --this.stateIndex;  
        this.updateView();
      }
    };

    this.leftClick = () => {
      console.log("left thing clicked");
      this.prevState();
    };

    this.rightClick = () => {
      console.log("right thing clicked");
      this.nextState();
    };

    // this.test = () => {
    //   console.log("aaaa");
    //   console.log(this.text.components.text);
    // };
  },

  play() {
    this.updateView();

    this.leftButton.object3D.addEventListener("interact", this.leftClick);
    this.rightButton.object3D.addEventListener("interact", this.rightClick);

    this.rightButton.object3D.addEventListener("user_menu_next_slide", this.nextState);
    this.leftButton.object3D.addEventListener("user_menu_prev_slide", this.prevState);
  },

  pause() {
    this.leftButton.object3D.removeEventListener("interact", this.leftClick);
    this.rightButton.object3D.removeEventListener("interact", this.rightClick);

    this.rightButton.object3D.removeEventListener("user_menu_next_slide", this.nextState);
    this.leftButton.object3D.removeEventListener("user_menu_prev_slide", this.prevState);
  },
    
    // this.onStateChange = evt => {
    //   if (!(evt.detail === "muted" || evt.detail === "frozen"))
    //     return;
    //   this.updateButtonStates();
    // };

    // this.onMicClick = () => {
    //   this.el.emit("action_mute");
    // };

  }
);

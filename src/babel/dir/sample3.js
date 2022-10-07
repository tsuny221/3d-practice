import * as THREE from "../libs/webgl/three.module.js";

// window.addEventListener(
//   "DOMContentLoaded",
//   () => {

//   },false);

class DiceAnim {
  makeInstance(x, y) {
    this.dice = new THREE.Mesh(this.geometry, this.materials);
    this.group.add(this.dice);
    this.dice.position.x = x;
    this.dice.position.y = y;
    return this.dice;
  }

  diceInit() {
    /**
     * Cubeを敷き詰める
     */

    this.dices = [];
    this.geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    this.group = new THREE.Group();
    this.texture = new THREE.TextureLoader()

    this.materials = [
      new THREE.MeshBasicMaterial({
        map: this.texture.load("assets/images/sample3/texture_1.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: this.texture.load("assets/images/sample3/texture_2.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: this.texture.load("assets/images/sample3/texture_3.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: this.texture.load("assets/images/sample3/texture_4.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: this.texture.load("assets/images/sample3/texture_5.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: this.texture.load("assets/images/sample3/texture_6.jpg"),
      }),
    ];

    this.scene.add(this.group);

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        this.dices.push(this.makeInstance(i, j));
      }
    }

    this.group.position.set(0.1, 0, 3);
  }



  playAnimation() {
    this.dices.forEach((dice) => {
      dice.rotation.y += 0.03;
      dice.rotation.z += 0.05;
    });
  }

  init() {
    /**
     * 三要素を作成
     */

    //シーン
    this.scene = new THREE.Scene();

    //サイズ
    this.sizes = {
      width: this.sample3.clientWidth,
      height: this.sample3.clientHeight,
    };

    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      50
    );
    this.camera.position.set(0, 0, 20);
    this.scene.add(this.camera);

    // this.aspect = this.sizes.width / this.sizes.height
    // this.scale = 5.0; // 切り取る空間の広さ（スケール）
    // this.horizontal = this.scale * this.aspect; // 横方向のスケール
    // this.vertiacal = this.scale;

    // // カメラ @@@
    // this.camera = new THREE.OrthographicCamera(
    //   -this.horizontal,
    //   this.horizontal,
    //   this.vertiacal,
    //   -this.vertiacal,
    //   0.1,
    //   50.0
    // );

    // this.camera.position.set(
    //   4,
    //   -4,
    //   30.0,
    // );
    // this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

    //レンダラー
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#E6E6E6", 0.12);

    /**
     * ライトを追加
     */
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(10, 10, 0);
    this.scene.add(this.directionalLight);

    //Cube初期設定
    this.diceInit();

  }

  constructor() {
    this.canvas = document.querySelector(".sample3-webgl");
    this.sample3 = document.querySelector(".sample3__block");
    this.first = true;
    this.clock = new THREE.Clock();
    this.time = 0;

    this.render = this.render.bind(this);

    /**
     * ブラウザリサイズ操作
     */
    window.addEventListener("resize", () => {
      //サイズのアップデート
      this.sizes.width = this.sample3.clientWidth;
      this.sizes.height = this.sample3.clientHeight;
      //カメラのアップデート
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.left = -5.0 * (this.sizes.width / this.sizes.height); // 横方向のスケール
      this.camera.right = 5.0 * (this.sizes.width / this.sizes.height); // 横方向のスケール
      this.camera.updateProjectionMatrix();
      //レンダラーのアップデート
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
    });
  }

  /**
   * 描画処理
   */

  render() {
    requestAnimationFrame(this.render);

    if (util.mode === "sp") return;

    this.time += 0.05;

    this.playAnimation();

    this.renderer.render(this.scene, this.camera);
  }
}

const app = new DiceAnim();
app.init();
app.render();

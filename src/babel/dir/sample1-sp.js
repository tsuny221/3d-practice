import * as THREE from "../libs/webgl/three.module.js";

class CubeAnimSp {
  makeInstance(x, y) {
    this.cube = new THREE.Mesh(this.geometry, this.materials);
    this.group.add(this.cube);
    this.cube.position.x = x / 3;
    this.cube.position.y = y / 3;
    return this.cube;
  }

  cubeInit() {
    /**
     * Cubeを敷き詰める
     */

    this.cubes = [];
    this.geometry = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    this.group = new THREE.Group();
    this.texture = new THREE.TextureLoader().load(
      "assets/images/sample1/texture.jpg"
    );

    this.materials = [
      new THREE.MeshToonMaterial({
        color: "#383838",
      }),
      new THREE.MeshToonMaterial({
        color: "#383838",
      }),
      new THREE.MeshToonMaterial({
        color: "#383838",
      }),
      new THREE.MeshToonMaterial({
        color: "#383838",
      }),
      new THREE.MeshToonMaterial({
        map: this.texture,
      }),
      new THREE.MeshToonMaterial({
        color: "#383838",
      }),
    ];

    this.scene.add(this.group);

    for (let i = -10; i <= 10; i++) {
      for (let j = -20; j <= 20; j++) {
        this.cubes.push(this.makeInstance(i, j));
      }
    }

    this.group.position.set(0, 0, 3);
  }

  makeVideoInstance(video) {
    this.videoMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.VideoTexture(video),
    });
    this.plane = new THREE.Mesh(this.planeGeometry, this.videoMaterial);
    this.plane.position.set(1.39, -4.1, 0);
    this.scene.add(this.plane);
    return this.plane;
  }

  videoInit() {
    this.planes = [];
    this.planeGeometry = new THREE.PlaneGeometry(0.8, 0.8);

    this.videos.forEach((video) => {
      this.planes.push(this.makeVideoInstance(video));
    });

     
  }

  animInit() {
    //配列に連続するアニメーションを追加
    this.animationScripts = [];
    this.animationScripts.push({
      start: 0,
      end: 1,
      function: () => {
        if (!this.first) return;
        this.planes[
          Math.floor(Math.random() * this.planes.length)
        ].position.z = 0.1;
        this.first = false;

        this.videos.forEach((video) => {
          video.currentTime = 0
          video.play();
        });
      },
    });

    this.animationScripts.push({
      start: 1,
      end: 2,
      function: () => {
        this.cubes[583].position.z -= 0.02;
        this.cubes[584].position.z -= 0.02;
        this.cubes[543].position.z -= 0.02;
        this.cubes[542].position.z -= 0.02;
      },
    });

    this.animationScripts.push({
      start: 2,
      end: 5,
      function: () => {
        this.cubes[543].position.x -= 0.02;
        this.cubes[542].position.x -= 0.02;
        this.cubes[583].position.x += 0.02;
        this.cubes[584].position.x += 0.02;
      },
    });

    this.animationScripts.push({
      start: 15,
      end: 18.05,
      function: () => {
        this.cubes[543].position.x += 0.02;
        this.cubes[542].position.x += 0.02;
        this.cubes[583].position.x -= 0.02;
        this.cubes[584].position.x -= 0.02;
      },
    });

    this.animationScripts.push({
      start: 18.05,
      end: 19.05,
      function: () => {
        this.cubes[583].position.z += 0.02;
        this.cubes[584].position.z += 0.02;
        this.cubes[543].position.z += 0.02;
        this.cubes[542].position.z += 0.02;
      },
    });

    this.animationScripts.push({
      start: 25,
      end: 25.05,
      function: () => {
        this.planes.forEach((plane) => {
          plane.position.z = 0;
        });
        this.first = true;
        this.time = 0;
      },
    });
  }

  playAnimation() {
    this.animationScripts.forEach((animation) => {
      if (this.time >= animation.start && this.time < animation.end)
        animation.function();
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
      width: this.sample1.clientWidth,
      height: this.sample1.clientHeight,
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
    this.cubeInit();
    //動画初期設定
    this.videoInit();
    //アニメーション初期設定
    this.animInit();
  }

  constructor() {
    this.canvas = document.querySelector(".sample1-webgl-sp");
    this.sample1 = document.querySelector(".sample1__block");
    this.videos = document.querySelectorAll("video");
    this.first = true;
    this.clock = new THREE.Clock();
    this.time = 0;

    this.render = this.render.bind(this);

    /**
     * ブラウザリサイズ操作
     */
    window.addEventListener("resize", () => {
      //サイズのアップデート
      this.sizes.width = this.sample1.clientWidth;
      this.sizes.height = this.sample1.clientHeight;
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

     if (util.mode !== "sp") return;

    this.time += 0.05;

    this.playAnimation();

    this.renderer.render(this.scene, this.camera);
  }
}

const app = new CubeAnimSp();
app.init();
app.render();

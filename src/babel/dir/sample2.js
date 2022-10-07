import * as THREE from "../libs/webgl/three.module.js";

// window.addEventListener(
//   "DOMContentLoaded",
//   () => {
   
//   },false);

class CylinderAnim {

  textureInit() {
    // キャンバスの作成
    this.canvas2d = document.createElement("canvas");
    this.ctx = this.canvas2d.getContext("2d");

    let sizeW = 700;
    let sizeH = 200;

    let scale = window.devicePixelRatio; //retina
  
    this.canvas2d.width = Math.floor(sizeW * scale);
    this.canvas2d.height = Math.floor(sizeH * scale);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.font = 40 * scale + "px sans-serif";
    this.ctx.fillText("CREATIVITY MEETS TECHNOLOGY", 0, 40 * scale);

    // テクスチャの作成
    this.texture = new THREE.Texture(this.canvas2d);
    // これをやらないとマテリアルは真っ暗
    this.texture.needsUpdate = true;
    
  }
  

  cylinderInit() {
    /**
     * cylinder作成
     */

    this.cylinderMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    let radiusTop = 200; //上面の半径です。0にすると円錐になります。
    let radiusBottom = 200; //底面の半径です。
    let objHeight = 200; //高さです。
    let radiusSegments = 32; //円周の分割数です。
    let heightSegments = 32; //高さの分割数です。
    //let openEnded = false; //true：フタをしない,false：フタをする
    let openEnded = true; //true：フタをしない,false：フタをする

    this.cylinder = new THREE.Mesh(
      //円柱のジオメトリー(上面半径,下面半径,高さ,円周分割数)
      new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        objHeight,
        radiusSegments,
        heightSegments,
        openEnded
      ),
      this.cylinderMaterial
    );
    
    this.cylinder.position.set(2, 0, 0);
    this.scene.add(this.cylinder);
  }

  playAnimation() {
    this.cylinder.rotation.y -= 0.01;

    this.cylinder.rotation.z = 0.5;
  }

  init() {
    /**
     * 三要素を作成
     */

    //シーン
    this.scene = new THREE.Scene();

    //サイズ
    this.sizes = {
      width: this.sample2.clientWidth,
      height: this.sample2.clientHeight,
    };

    // カメラ
    this.camera = new THREE.PerspectiveCamera(45,this.sizes.width / this.sizes.height);
    this.camera.position.set(0, 0, +1000);
    this.scene.add(this.camera);

    //レンダラー
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);

    /**
     * ライトを追加
     */

    //環境光源(アンビエントライト)：すべてを均等に照らす、影のない、全体を明るくするライト
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(this.ambientLight);

    // //平行光
    // this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.position.set(200, 200, 300);
    // this.scene.add(this.directionalLight);

    //Texture初期設定
    this.textureInit();
    //Cube初期設定
    this.cylinderInit();
  }

  constructor() {
    this.canvas = document.querySelector(".sample2-webgl");
    this.sample2 = document.querySelector(".sample2__block");
    this.first = true
    this.clock = new THREE.Clock();
    this.time = 0;

    this.render = this.render.bind(this);

    /**
     * ブラウザリサイズ操作
     */
    window.addEventListener("resize", () => {
      //サイズのアップデート
      this.sizes.width = this.sample2.clientWidth;
      this.sizes.height = this.sample2.clientHeight;
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

    this.time += 0.05;

    this.playAnimation();

    this.renderer.render(this.scene, this.camera);
  }
}

const app = new CylinderAnim();
app.init();
app.render();

 
AFRAME.registerComponent("bowling-balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "t") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");

        ball.setAttribute("scale", { x: 3, y: 3,  z: 3});

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y-1.2,
          z: pos.z,
        });

        

        

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));
        ball.setAttribute('dynamic-body',{
          shape:'sphere',
          mass:'0'
        })
        var scene = document.querySelector("#scene");
        ball.addEventListener('collide',this.removeBall)
        scene.appendChild(ball);
      }
    });
  },


removeBall: function (e) {
  //Original entity (ball)
  console.log(e.detail.target.el);

  //Other entity, which ball touched.
  console.log(e.detail.body.el);

  //ball element
 var element=e.detail.target.el

  //element which is hit
 var elementHit=e.detail.body.el

  if (elementHit.id.includes("pin")) 
    {
      //set material attribute
      elementHit.setAttribute('material',{
        opacity:1,
        transparent:true
      })

      //impulse and point vector
      var impulse=new CANNON.Vec3(-2,2,1)
      var worldPoint=new CANNON.Vec3().copy(elementHit.getAttribute('position'))
      elementHit.body.applyImpulse(impulse,worldPoint)

      //remove event listener
      element.removeEventListener('collide',this.shoot)
      
      //remove the bullets from the scene
      var scene=document.querySelector('#scene')
      scene.removeChild(element)
  }
},
});




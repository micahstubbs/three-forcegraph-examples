fetch('blocks-citation-graph.json')
  .then(res => res.json())
  .then(data => {
    const N = 300
    const Graph = new ThreeForceGraph()
      .graphData(data)
      .nodeAutoColorBy(node => node.user)

    // Setup renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('3d-graph').appendChild(renderer.domElement)

    // Setup scene
    const scene = new THREE.Scene()
    scene.add(Graph)
    scene.add(new THREE.AmbientLight(0xbbbbbb))

    // Setup camera
    const camera = new THREE.PerspectiveCamera()
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    camera.lookAt(Graph.position)
    camera.position.z = Math.cbrt(N) * 100

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement)

    // Kick-off renderer
    ;(function animate() {
      // IIFE
      Graph.tickFrame()

      // Frame cycle
      tbControls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    })()
  })

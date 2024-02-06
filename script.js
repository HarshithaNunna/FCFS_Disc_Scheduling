document.addEventListener("DOMContentLoaded", function() {

  var canvas = document.getElementById("graphCanvas")
  var context = canvas.getContext("2d")


  context.lineWidth = 1


  var canvasWidth = canvas.width
  var canvasHeight = canvas.height
  var yAxisWidth = 10

  context.beginPath()
  context.moveTo(yAxisWidth, 0)
  context.lineTo(yAxisWidth, canvasHeight)
  context.stroke() 
  
  var numLines = 10
  var lineSpacing = (canvasWidth - yAxisWidth) / numLines

  for (var i = 0; i <= numLines; i++) {
    var x = i * lineSpacing + yAxisWidth
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, canvasHeight)
    context.stroke() // Draw each vertical line

 
    context.fillText(i * 10, x - 10, 20)
  }

  
  var startPoint = { x: 60, y: 60 }
  var endPoint = { x: 107, y: 115 }

  
  var animationDuration = 5

 
  var interval = animationDuration / (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y))

  
  var currentPoint = { x: startPoint.x, y: startPoint.y }

  
  function updatePosition() {
   
    currentPoint.x += (endPoint.x - startPoint.x) / animationDuration * interval
    currentPoint.y += (endPoint.y - startPoint.y) / animationDuration * interval

  
    context.clearRect(0, 0, yAxisWidth, canvasHeight)
    context.clearRect(currentPoint.x, 0, canvasWidth - currentPoint.x, canvasHeight)

    
    context.beginPath()
    context.moveTo(yAxisWidth, 0)
    context.lineTo(yAxisWidth, canvasHeight)
    context.stroke()

    for (var i = 0; i <= numLines; i++) {
      var x = i * lineSpacing + yAxisWidth
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, canvasHeight)
      context.stroke()
      context.fillText(i * 10, x - 10, 20)
    }

   
    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)
    context.lineTo(currentPoint.x, currentPoint.y)
    context.stroke()

 
    var arrowheadSize = 1
    var dx = endPoint.x - currentPoint.x
    var dy = endPoint.y - currentPoint.y
    var angle = Math.atan2(dy, dx)
    context.save()
    context.translate(currentPoint.x, currentPoint.y)
    context.rotate(angle)
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(-arrowheadSize, -arrowheadSize / 2)
    context.lineTo(-arrowheadSize, arrowheadSize / 2)
    context.closePath()
    context.fill()
    context.beginPath()
    context.arc(0, 0, 2.5, 0, 2 * Math.PI) // Draw a circle with radius 5 at the end of the line
    context.fillStyle = 'red'
    context.fill()
    context.restore()

   
    if (currentPoint.x >= endPoint.x && currentPoint.y >= endPoint.y) {
      if (endPoint.x === 107 && endPoint.y === 115) {
      
        startPoint = { x: endPoint.x, y: endPoint.y }
        endPoint = { x: 206, y: 150 }
        animationDuration = 5
        interval = animationDuration / (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y))
      } else if (endPoint.x === 206 && endPoint.y === 150) {
        
        startPoint = { x: endPoint.x, y: endPoint.y }
        endPoint = { x: 305, y: 230 }
        animationDuration = 5
        interval = animationDuration / (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y))
      } else if (endPoint.x === 305 && endPoint.y === 230) {
       
        startPoint = { x: endPoint.x, y: endPoint.y }
        endPoint = { x: 450, y: 280 }
        animationDuration = 5
        interval = animationDuration / (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y))
      } else {
     
        return
      }

    
      currentPoint = { x: startPoint.x, y: startPoint.y }
    }

 
    requestAnimationFrame(updatePosition)
  }


  requestAnimationFrame(updatePosition)
})

  

function left(c) {
  if (c === 'N') return 'W';
  if (c === 'S') return 'E';
  if (c === 'E') return 'N';
  return 'S';
}

function right(c) {
  if (c === 'N') return 'E';
  if (c === 'S') return 'W'; 
  if (c === 'E') return 'S'; 
  return 'N'; 
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// limits
rl.question('' ,(plateauCoordinates) => {
  const [n, m] = plateauCoordinates.split(' ').map(Number)

  // position and orientation of rover
  rl.on('line', (line) => {
    const [x, y, c] = line.split(' ')
    let roverX = Number(x)
    let roverY = Number(y)
    let roverOrientation = c

    // rover inctructions
    rl.question('', (instructions) => {
      for (let i = 0; i < instructions.length; i++) {
        if (instructions[i] === 'M') {
          if (roverOrientation === 'N') roverY++
          if (roverOrientation === 'S') roverY--
          if (roverOrientation === 'E') roverX++
          if (roverOrientation === 'W') roverX--

          // condicion para que no se salga de los limites el problema no especifica que es n y m osea si 'n' es las filas o columnas lo mismo para 'm' 
          // asi que asumire que n son las filas y m las columnas
          // estas condiciones haran de que el robot no se salga de los limites del rectangulo
          if (roverY < 0) roverY = 0
          if (roverY > n) roverY = n;
          if (roverX < 0) roverX = 0;
          if (roverX > m) roverX = m; 
        } else {
          if (instructions[i] === 'L') {
            // rotate orientation rover left
            roverOrientation = left(roverOrientation)
          } else {
            // rotate orientation rover right 
            roverOrientation = right(roverOrientation)
          }
        }
      }
      console.log(roverX, roverY, roverOrientation)
    })
  })
})
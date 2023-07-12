const Validate = (input) => {
  let errors = {}
  if (!input.name) {
    errors.name = 'Ingresa el nombre de tu Juego'
  }

  if (input.types.length < 1 || input.types.length > 3) {
    errors.types = 'Tu Juego debe tener minimo 1 genero'
  }
  return errors
}

export default Validate

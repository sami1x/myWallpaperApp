const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

export function getRandomName(length) {
  let name = '';
  for (let i = 0; i < length; i++) {
    name += getRandomCharacter();
  }
  return name;
}

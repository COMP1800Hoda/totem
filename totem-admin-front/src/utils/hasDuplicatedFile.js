export const hasDuplicatedFile = (files) => {
  const nameSet = new Set();
  for (const file of files) {
    if (nameSet.has(file.name)) {
      alert('Cannot add duplicated image name')
      return true;
    }
    nameSet.add(file.name);
  }
  return false;
};
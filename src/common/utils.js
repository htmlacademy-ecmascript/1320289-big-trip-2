import he from 'he';

const isEscKeyCode = (evt) => evt.key === 'Escape';

const onEscKeydown = (evt, cb) => {
  if (!isEscKeyCode(evt)) {
    return;
  }

  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
    return;
  }

  evt.preventDefault();
  cb();
};

const getArrayFromMap = (map) => Array.from(map.values());

const getEncodedData = (data) => he.encode(data);

export { onEscKeydown, getArrayFromMap, getEncodedData };

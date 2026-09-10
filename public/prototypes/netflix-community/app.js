const composer = document.querySelector('#composer');
const input = document.querySelector('#thought-input');
const count = document.querySelector('#count');
const toast = document.querySelector('#toast');

document.querySelector('#open-composer').addEventListener('click', () => composer.showModal());
input.addEventListener('input', () => count.textContent = `${input.value.length} / 280`);
document.querySelector('#post').addEventListener('click', event => {
  if (!input.value.trim()) { event.preventDefault(); input.focus(); return; }
  toast.classList.add('show');
  input.value = '';
  count.textContent = '0 / 280';
  setTimeout(() => toast.classList.remove('show'), 3000);
});
document.querySelector('.reveal').addEventListener('click', event => event.currentTarget.closest('.spoiler').classList.add('revealed'));
document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelector('.chip.selected').classList.remove('selected');
  chip.classList.add('selected');
}));

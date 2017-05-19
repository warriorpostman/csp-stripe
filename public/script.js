
document.getElementById('payBtn').onclick = function(e) {
  console.log('clicked');
  const str = window.Stripe('asdfas');
  console.log('got stripe' , str);
  const elements = str.elements();
  console.log('got elements ', elements);
  const card = elements.create('card', {});
  card.mount('#card');

}

//function Initialize
(function init() {
  //Click Event On Add Order Btn
  const orderItem = document.querySelectorAll('.fa-plus');
  orderItem.forEach(orderbtn => orderbtn.addEventListener('click', addOrder));
  //Change Event On Cart Value Input
  let cartValue = document.querySelectorAll('.cart-item-input');
  cartValue.forEach(cartInput =>
    cartInput.addEventListener('change', updateTotal)
  );
  //Remove Cart Item Event
  let cartRemove = document
    .querySelector('.cart-list')
    .addEventListener('click', removeOrder);
  //Hide Modal from DOM
  document.querySelector(".modal a").addEventListener("click", hideModal);
  //update total
  updateTotal();
})();
//Add Order To list
function addOrder() {
  //Get Oder Image
  let orderImg = this.parentElement.parentElement.querySelector('.item-img img')
    .src;
  //Get Order Price
  let orderPrice = parseFloat(
    this.parentElement.querySelector('.item-price').textContent
  );
  //Get Ordr Name
  const orderName = this.parentElement.parentElement.querySelector('.item-name p')
    .textContent;
  console.log(orderName)
  let preExistNames = document.querySelectorAll(".cart-item-name");
  for (let i = 0; i < preExistNames.length; i++) {
    let preExistName = preExistNames[i].textContent;
    if (orderName.trim() == preExistName.trim()) {
      //Modal
      document.querySelector(".modal-wrapper").style.display = "flex";
      return;
    }
  }
  //Check OrderName
  let orderCartName = document.querySelectorAll('.cart-item-name');

  //Get Oder List ul
  const orderUl = document.querySelector('.cart-list');
  //Create Element li
  let orderLi = document.createElement('li');
  orderLi.classList.add('cart-item');
  orderLi.innerHTML = ` <div class="cart-item-image">
 <img src="${orderImg}" alt="" />
</div>
<div class="cart-item-name">
 ${orderName}
</div>
<div class="cart-item-value">
 <span>$</span>
 <span class="order-price">${orderPrice}.00</span>
</div>
<div class="cart-item-quantity">
            -
          <input type="number" class="cart-item-input" value="1" />+</div>
<i class="fas fa-times cart-item-remove"></i>`;
  //Append li to ul
  orderUl.appendChild(orderLi);
  //Update Total
  updateTotal();
}
//function Remove Order
function removeOrder(e) {

  if (e.target.className == 'fas fa-times cart-item-remove') {
    let currentOrder = e.target.parentElement;
    const orderRemovedFrom = document.querySelector('.cart-list');
    orderRemovedFrom.removeChild(currentOrder);

  }
  //Update Total
  updateTotal();

}
//Update Total
function updateTotal() {
  let finalPrice = 0;
  //Get cart list
  let cartList = document.querySelectorAll('.cart-item');
  for (let i = 0; i < cartList.length; i++) {
    //Get Cart Price
    let totalPrice = cartList[i].querySelector('.order-price');
    //Get Cart Value
    let totalValue = cartList[i].querySelector('.cart-item-input');
    //Set Cart Price
    let totalPriceArr = parseFloat(totalPrice.textContent);
    //Set Cart Value
    let totalValueArr = parseFloat(totalValue.value);
    //Set Final Price
    finalPrice += totalPriceArr * totalValueArr;
  }
  //Display Total In DOM
  document.querySelector('.total-price').textContent = finalPrice;
}
//function Hide Modal
function hideModal() {
  document.querySelector(".modal-wrapper").style.display = "none";
}
window.addEventListener("DOMContentLoaded",getItems);
let expenseAmount = document.getElementById('expenseAmount');
let expenseDescription = document.getElementById('expenseDescription');
let expenseCategory = document.getElementById('expenseCategory');
let items = document.querySelector('ul');
items.addEventListener('click',removeItem);
items.addEventListener('click',editItem);

function getItems() {
   axios.get('https://crudcrud.com/api/3bc24c6ac950423cae9552291eb6f6a9/createExpense')
   .then((res) => {
      showItems(res.data)
//      console.log(res.data)
   })
   .catch(err => console.log(err))
}
function showItems(data){
   data.forEach((data) =>{let list =  document.createElement('li');
  // console.log(1);
   list.style.listStyleType = 'none'
   list.style.margin = "10px";
   list.appendChild(document.createTextNode(`${data.expenseAmnt} ${data.expenseCatgry} ${data.expenseDescption}`));
   const deleteBtn = document.createElement('button');
   deleteBtn.className = 'delete';
   deleteBtn.textContent = "delete";
   //console.log(deleteBtn);
   deleteBtn.style.position = 'relative';
   deleteBtn.style.left = '30px';
   
   const editBtn = document.createElement('button');
   editBtn.className = 'edit'
   editBtn.textContent = "edit"
   editBtn.style.position = 'relative';
   editBtn.style.left = '40px';
   list.appendChild(deleteBtn);
   list.appendChild(editBtn);
   items.appendChild(list);})
   
}
function removeItem(e) {
   if(e.target.classList.contains('delete'))
   {
      if(confirm("Are you sure?"))
      {
          // let del = e.target.parentElement;
           let data = del.firstChild.textContent;
          // del.remove();
           let list = [];
           list = data.split(' ');
  //         console.log(list);
           axios.get('https://crudcrud.com/api/3bc24c6ac950423cae9552291eb6f6a9/createExpense')
           .then(res => {
            const d = res.data;
            d.forEach((data) =>{
               if(data.expenseCatgry === list[1])
               {
                  const id = data._id;
                    axios.delete(`https://crudcrud.com/api/3bc24c6ac950423cae9552291eb6f6a9/createExpense/${id}`)
                    .then(() => {
    //                 console.log(1);
                    items.innerHTML = '';
                     getItems();
                     return 0;
                    })
               }
            })
           })
          
      }
   }
}
function editItem(e) {
   if(e.target.classList.contains('edit'))
   {
      let edit = e.target.parentElement;
      let data = edit.firstChild.textContent;
      console.log(data);
      let list = [];
      list = data.split(' ');
    //  console.log(list)
      edit.remove();

      expenseAmount.value = list[0];
      expenseCategory.value = list[1];
      expenseDescription.value = list[2];
      let format =  document.getElementById('addForm');
      format.addEventListener('click',update)
      function update(e){
         e.preventDefault();
         axios.get('https://crudcrud.com/api/3bc24c6ac950423cae9552291eb6f6a9/createExpense')
           .then(res => {
            const d = res.data;
            d.forEach((data) =>{
               if(data.expenseCatgry === list[1])
               {
                  const id = data._id;
                    axios.put(`https://crudcrud.com/api/3bc24c6ac950423cae9552291eb6f6a9/createExpense/${id}`,{
                     expenseAmnt : `${list[0]}`,
                     expenseCatgry : `${list[1]}`,
                     expenseDescption : `${list[2]}`
                    })
                    .then((res) => {
                     console.log(1);
                    items.innerHTML = '';
                     getItems();
                     return -1;
                 // after getItems() it should end the progrma but it is not     
                    })
               }
            })
           })
      }
     // localStorage.removeItem(expenseCategory.value)
   }

}
let form = document.getElementById('addForm');
form.addEventListener('submit', onSubmit);
function onSubmit(e){
e.preventDefault();
if(expenseAmount.value == '' || expenseDescription.value == '' || expenseCategory.value == '') alert("Enter the Values");
else {
  
   axios.post('https://crudcrud.com/api/3bc24c6ac950423cae9552291eb6f6a9/createExpense',{
      expenseAmnt : `${expenseAmount.value}`,
      expenseCatgry : `${expenseCategory.value}`,
      expenseDescption : `${expenseDescription.value}`
   })
   .then(res =>{ 
 //     console.log(res.data);
   items.innerHTML = '';
   getItems();
   })
}
}
let bestListArray = document.querySelectorAll(".best-list_top-array li")

bestListArray.forEach(item => {
  item.addEventListener("click",()=>{
    if(item === bestListArray[0]){
      bestListArray[0].style.color = "var(--content)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[1]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--content)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[2]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--content)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[3]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--content)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[4]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--content)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[5]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--content)";
    }
  })
})
const loadPhone = async (searchText='6',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';


    // show all button
    let showAll = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden') 
    }

    //   show 12 phone at a time
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-white-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure class="bg-[#0D6EFD0D] p-6 m-6"><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center space-y-3">
            <h2 class="text-lg font-bold">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-3xl font-bold">$999</p>
            <div class="card-actions justify-center">
            <button class="rounded py-2 px-6 bg-[#0D6EFD] text-white" onclick="handleShowDetails('${phone.slug}')">Show Details</button>
            </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide toggle spinner 
  toggleLoadingSpinner(false)
};

// handle show details

const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneInfo = data.data
    console.log(phoneInfo)
    showPhoneDetails(phoneInfo)
}

// show phone details
    const showPhoneDetails = (phoneInfo) =>{
        // modal details

    const modalContainer = document.getElementById('show-detail-container');
    modalContainer.innerHTML = `
    <img class="mx-auto mb-8" src="${phoneInfo.image}" alt="">
    <div class='space-y-3 mb-3'>
        <h3 class="text-3xl font-bold">${phoneInfo.name}</h3>
        <p class="text-base font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    </div>
    <div class="space-y-2">
        <p class="text-lg font-semibold">Brand :<span class="text-sm"> ${phoneInfo.brand}</span></p>
        <p class="text-lg font-semibold">Storage :<span class="text-sm"> ${phoneInfo?.mainFeatures?.storage}</span></p>
        <p class="text-lg font-semibold">Display Size :<span class="text-sm"> ${phoneInfo?.mainFeatures?.displaySize}</span></p>
        <p class="text-lg font-semibold">ChipSet :<span class="text-sm"> ${phoneInfo?.mainFeatures?.chipSet}</span></p>
        <p class="text-lg font-semibold">Memory :<span class="text-sm"> ${phoneInfo?.mainFeatures?.memory}</span></p>
        <p class="text-lg font-semibold">Slug :<span class="text-sm"> ${phoneInfo?.slug}</span></p>
        <p class="text-lg font-semibold">Release data :<span class="text-sm"> ${phoneInfo.releaseDate}</span></p>

        <p class="text-lg font-semibold">GPS :<span class="text-sm"> ${phoneInfo?.others?.GPS}</span></p>
    </div>
    `
        show_details_modal.showModal()
    }


// search button handler

    const btnSearchHandler = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    loadPhone(searchText,isShowAll);
}


//  loading spinner

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    } 
};


// handle show all
const handleShowAll = () =>{
    btnSearchHandler(true)
}


loadPhone()
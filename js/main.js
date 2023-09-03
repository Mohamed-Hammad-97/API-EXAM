let sideBarPosition = $(".nav-tabs").innerWidth()
let allData = [];

$(document).ready(function () {
    async function getData() {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        let { meals: allData } = await res.json();
        display(allData);
        $(".loadingDisplay").fadeOut(1000)
    }
    getData();
    $(".loading .sk-chase").fadeOut(1000, function () {
        $(".loading").fadeOut(1000)
        $("body").css("overflow", "auto")
    })
    closeSideNav()
})

// START NAVSIDE SECTION
function closeSideNav() {
    $("#sideBar").animate({ left: -sideBarPosition }, 1000)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links ul li").animate({ top: 300 }, 1000)
}
function openSideNav() {
    $("#sideBar").animate({ left: "0px" }, 1000)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links ul li").eq(i).animate({ top: 0 }, (i + 5) * 200);
    }
}

$(".openNav").click(function () {
    if ($("#sideBar").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
// END NAVSID SECTION

// START MEALS HOME DATA


function display(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="loadingDisplay">
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>
        <div class="col-md-3">
            <div onclick="getMealDetails('${data[i].idMeal}')" class="position-relative overflow-hidden rounded-2 ">
                <img src="${data[i].strMealThumb}" class="w-100" alt="">
                <div class="layer position-absolute d-flex justify-content-start align-items-center">
                    <h3 class="p-1 text-black">${data[i].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    homeData.innerHTML = cartona;
}

async function getMealDetails(mealInfo) {
    homeData.innerHTML = ""
    searchInput.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealInfo}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    closeSideNav()
    $(".loadingDisplay").fadeOut(1000)
}

function displayMealDetails(data) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="p-2 m-2 bg-Ingredients colorText rounded-3">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="p-2 me-2 bg-tags textColorTags rounded-3">${tags[i]}</li>`
    }

    let cartoona = `<div class="loadingDisplay">
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    </div>
    <div class="col-md-4">
                <img src="${data.strMealThumb}" class="w-100 rounded-3 mb-3" alt="">
                <h2>${data.strMeal}</h2>
             </div>
             <div class="col-md-8">
                 <h2>Instructions</h2>
                 <p>${data.strInstructions}</p>
                <h3><span> Area :</span>${data.strArea}</h3>
                <h3><span> Category :</span>${data.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="d-flex flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="d-flex flex-wrap"> ${tagsStr}</ul>
                <a href="${data.strSource}" class="btn btn-success text-white " target="_blank">Source</a>
                <a href="${data.strYoutube}" class="btn btn-danger text-white" target="_blank">Youtube</a>
            </div>`

    homeData.innerHTML = cartoona
    closeSideNav()
    $(".loadingDisplay").fadeOut(1000)
}
//END MEALS HOME DATA 

// START SEARCH SECTION
$(".search").click(function () {
    searchInput.innerHTML = `<div class="row py-4 searchPlaceholder">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-black text-white" type="search" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" class="form-control bg-black text-white" type="search" placeholder="Search By First Letter" maxlength="1">
        </div>
    </div>`
    homeData.innerHTML = ""
    closeSideNav()
})

async function searchByName(term) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let { meals: allData } = await res.json();
    display(allData);
    $(".loadingDisplay").fadeOut(1000)
}


async function searchByFirstLetter(term) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let { meals: allData } = await res.json();
    term == "" ? term = "a" : "";
    display(allData);
    $(".loadingDisplay").fadeOut(1000)
}

// END SEARCH SECTION

// START CATEGORY SECTION
$(".Categories").click(async function getDataCategray() {
    searchInput.innerHTML = "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let { categories: allData } = await res.json();
    displayCategray(allData);
    closeSideNav()
    $(".loadingDisplay").fadeOut(2000)
})
function displayCategray(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="loadingDisplay">
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    </div>
        <div class="col-md-3 mb-3">
                <div onclick="getCategoryMeals('${data[i].strCategory}')" class="position-relative overflow-hidden rounded-2 ">
                    <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
                    <div class="layer position-absolute text-center">
                       <h3 class="p-1 text-black">${data[i].strCategory}</h3>
                       <p class="text-black">${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    homeData.innerHTML = cartona;
};
async function getCategoryMeals(categorySearch) {
    homeData.innerHTML = ""
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySearch}`)
    let { meals: allData } = await res.json()
    display(allData)
    $(".loadingDisplay").fadeOut(1000)
}
// END CATEGORY SECTION

// START AREA SECTION
$(".Area").click(async function getDataArea() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let { meals: allData } = await res.json();
    displayAreaData(allData);
    closeSideNav()
    $(".loadingDisplay").fadeOut(1500)
})
function displayAreaData(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="loadingDisplay">
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    </div>
    <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="text-center fs-1">
                    <i class="fa-solid fa-house-laptop fa-2x"></i>
                    <h3>${data[i].strArea}</h3>
                </div>
            </div>`
    }
    homeData.innerHTML = cartona;
};
async function getAreaMeals(areaSearch) {
    homeData.innerHTML = ""
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSearch}`)
    let { meals: allData } = await res.json()
    display(allData)
    $("#sideBar").animate({ left: -sideBarPosition }, 1000, function () {
        $(".loadingDisplay").fadeOut(1000)
    })
}
// END AREA SECTION

// START INGREDIENTS SECTION
$(".Ingredients").click(async function getDataIngredients() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let { meals: allData } = await res.json();
    displayIngredientsData(allData.slice(0, 20));
    closeSideNav()
    $(".loadingDisplay").fadeOut(2000)
})
function displayIngredientsData(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="loadingDisplay">
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    </div>
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="text-center fs-1">
                    <i class="fa-solid fa-drumstick-bite fa-2x"></i>
                    <h3>${data[i].strIngredient}</h3>
                    <p class="text-white fs-6">${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>`
    }
    homeData.innerHTML = cartona;
};

async function getIngredientsMeals(ingredientsSearch) {
    homeData.innerHTML = ""
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsSearch}`)
    let { meals: allData } = await res.json()
    display(allData)
    $(".loadingDisplay").fadeOut(1000)
};
// END INGREDIENTS SECTION

// START CONTACT SECTION
$(".Contact").click(function () {
    searchInput.innerHTML = ``;
    homeData.innerHTML = `
    <div class="d-flex justify-content-center align-items-center vh-100 ">
            <div class="container w-75">
                <div class="row d-flex  g-4">
                    <div class="col-md-6">
                        <input onkeyup="validateName()" type="text" id="nameInput" placeholder="Enter Your name" class="form-control mb-1">
                        <div class="text-black rounded-3 p-2 text-center  d-none bg-danger" id="wrongName">Invalid Name (suppose start with capital letter )</div>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validateEmail()" type="email" id="email" placeholder="Enter Your Email" class="form-control mb-1">
                        <div class="text-black rounded-3 p-2 text-center  d-none bg-danger" id="wrongEmail">Invalid Email</div>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validatePhone()" type="number" id="phone" placeholder="Enter Your Phone" class="form-control mb-1">
                        <div class="text-black rounded-3 p-2 text-center  d-none bg-danger" id="wrongPhone"> Enter valid Phone Number</div>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validateAge()" type="number" id="age" placeholder="Enter Your Age" class="form-control mb-1">
                        <div class="text-black rounded-3 p-2 text-center  d-none bg-danger" id="wrongAge"> Enter valid Age (Between 10 ~ 100 )</div>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validatePassword()" type="password" id="password" placeholder="Enter Your Password" class="form-control mb-1">
                        <div class="text-black rounded-3 p-2 text-center  d-none bg-danger" id="wrongPassword">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validateRePassword() ; submit()" type="password" id="repassword" placeholder="RePassword" class="form-control mb-1">
                        <div class="text-black rounded-3 p-2 text-center  d-none bg-danger" id="wrongRePassword">invalid RePassword</div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-outline-danger text-danger disabled">Submit</button>
                    </div>
                </div>
            </div>
        </div>`
    closeSideNav()
});

function validateName() {
    let res = $("#nameInput").val()
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(res) == true) {
        nameInput.classList.replace("is-invalid", "is-valid");
        $("#wrongName").addClass("d-none")
        return true
    } else {
        nameInput.classList.add("is-invalid");
        $("#wrongName").removeClass("d-none")
        return false
    }
};
function validateEmail() {
    let res = $("#email").val()
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(res) == true) {
        email.classList.replace("is-invalid", "is-valid");
        $("#wrongEmail").addClass("d-none")
        return true
    } else {
        email.classList.add("is-invalid");
        $("#wrongEmail").removeClass("d-none")
        return false
    }
};
function validatePhone() {
    let res = $("#phone").val()
    var regex = /^(002)?01[0125][0-9]{8}$/;
    if (regex.test(res) == true) {
        phone.classList.replace("is-invalid", "is-valid");
        $("#wrongPhone").addClass("d-none")
        return true
    } else {
        phone.classList.add("is-invalid");
        $("#wrongPhone").removeClass("d-none")
        return false
    }
};
function validateAge() {
    let res = $("#age").val()
    var regex = /^([1-9][0-9]|100)$/;
    if (regex.test(res) == true) {
        age.classList.replace("is-invalid", "is-valid");
        $("#wrongAge").addClass("d-none")
        return true
    } else {
        age.classList.add("is-invalid");
        $("#wrongAge").removeClass("d-none")
        return false
    }
};
function validatePassword() {
    let res = $("#password").val()
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(res) == true) {
        password.classList.replace("is-invalid", "is-valid");
        $("#wrongPassword").addClass("d-none")
        return true
    } else {
        password.classList.add("is-invalid");
        $("#wrongPassword").removeClass("d-none")
        return false
    }
};
function validateRePassword() {
    let res = $("#repassword").val()
    if (res == $("#password").val()) {
        repassword.classList.replace("is-invalid", "is-valid");
        $("#wrongRePassword").addClass("d-none")
        return true
    } else {
        repassword.classList.add("is-invalid");
        $("#wrongRePassword").removeClass("d-none")
        return false
    }
};

function submit() {
    if (validateName() && validateEmail() && validatePhone() && validateAge && validatePassword() && validateRePassword() == true) {
        $("button").removeClass("disabled")
    } else {
        $("button").addClass("disabled")
    }
}
// END CONTACT SECTION

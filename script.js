// Store cart items and total price
let cartItems = [];
let totalPrice = 0;

// Function to show course details in the sidebar
function showCourseDetails(courseTitle, coursePrice, courseImage) {
    // Add course details to the cartItems array
    cartItems.push({ title: courseTitle, price: coursePrice, image: courseImage });
    // Update total price
    totalPrice += coursePrice;
    // Update the sidebar
    updateSidebar();
}

// Function to remove a course from the sidebar
function removeCourse(index) {
    // Subtract the removed course price from total price
    totalPrice -= cartItems[index].price;
    // Remove the course from the cartItems array
    cartItems.splice(index, 1);
    // Update the sidebar
    updateSidebar();
}

// Function to update the sidebar content
function updateSidebar() {
    // Display total number of items in the cart
    document.querySelector('.totalItem').textContent = cartItems.length;
    const cartList = document.querySelector('.listCart');
    cartList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="flex justify-between items-center px-4 py-2 border-b">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-full mr-3">
                    <div class="text-[16px] font-[poppins] text-slate-500">${item.title} <span class="text-[17px] font-semibold ml-3">${item.price} TK</span></div>
                </div>
                <div><button class="removeItem" onclick="removeCourse(${index})"><img class="w-8 h-8" src="./img/cross-svgrepo-com.svg" alt="remove"></button></div>
            </div>
        `;
        cartList.appendChild(listItem);
    });
    // Display total price
    document.querySelector('.totalPrice').textContent = totalPrice;
}

// Close the sidebar
document.querySelector('.shoppingClose').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.add('hidden');
});

// Buy course button click event
const buyButtons = document.querySelectorAll('.buyCourse');
buyButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        // Show the sidebar
        document.querySelector('.sidebar').classList.remove('hidden');

        // Get course details from the clicked card
        const cardTitle = document.querySelectorAll('.card-title')[index].textContent.trim();
        const cardPrice = parseInt(document.querySelectorAll('.price-value')[index].textContent, 10);
        const cardImage = document.querySelectorAll('.card .course-image img')[index].src;
        // Add the course to the sidebar
        showCourseDetails(cardTitle, cardPrice, cardImage);
        // Disable the clicked button and apply the disabled
        button.disabled = true;
        button.classList.add('disabled');
    });
});

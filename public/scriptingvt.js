
// //new for virtual try on


// document.addEventListener("DOMContentLoaded", function () {
//     const list = ["earring", "earring1","earring2","earring3","nosepin","noserings","glasses","glasses1","glasses2","glasses3"];
//     const visibles = [false, true];
//     const setVisible = (button, entities, visible) => {
//         if (visible) {
//             button.classList.add("selected");
//         } else {
//             button.classList.remove("selected");
//         }
//         entities.forEach((entity) => {
//             entity.setAttribute("visible", visible);
//         });
//     }
//     list.forEach((item, index) => {
//         const button = document.querySelector("#" + item);
//         const entities = document.querySelectorAll("." + item + "-entity");
//         setVisible(button, entities, visibles[index]);
//         button.addEventListener('click', () => {
//             visibles[index] = !visibles[index];
//             setVisible(button, entities, visibles[index]);
//         });
//     });
//     {
//         const elements = document.querySelectorAll('.animate');
//         elements.forEach((element, index) => {
//             setTimeout(() => {
//                 element.classList.add('visible');
//             }, index * 2000); // Delay each element by 2 seconds
//         });
//     }
    
// });

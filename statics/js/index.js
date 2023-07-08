const Get_Btn_btnCloseAddEvent = document.querySelector(".btnCloseAddEvent");
const Get_Btn_form_inputSubmit = document.querySelector(".form_input--submit");
const Get_AddEvent = document.querySelector("#AddEvent");
const Get_BackToTop = document.querySelector("#backtop");
const trung = "k19204";

const API_POST = "http://localhost:3000/post";
const click = 5 ;


function StartApp() {
    OpenAddContent();
    GET_Courcses(render);
}

StartApp();

function OpenAddContent() {
    let i = null;
    Get_BackToTop.addEventListener("click", (e) => {
        i++;
        document.title = `K19 - P.204 - ${i}`;
        if (i == click) {
            document.title = `K19 - P.204 Thêm Bảng`;
            Get_AddEvent.style = "display : block;";
            console.log(POST_data.post());
            Get_Btn_btnCloseAddEvent.addEventListener("click", (e) => {
                Get_AddEvent.style = "display : none;";
                document.title = `K19 - P.204`;
            });
            return (i = -1);
        }
    });
}

var POST_data = {
    checkValueInput: () => {
        let GET_Content = document.querySelector("#inputNoiDung").value;
        let GET_Price = document.querySelector("#inputPrice").value;
        let GET_Select = document.querySelector("#inputThuChi").value;
        let GET_Date = document.querySelector("#inputDate").value;

        if (GET_Date == "") {
            const date = new Date();
            GET_Date = `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`;
        }

        return [GET_Content, GET_Price, GET_Select, GET_Date];
    },

    post: function () {
        const GET_Pust = document.querySelector(".form_input--submit");

        GET_Pust.addEventListener("click", (e) => {
            let [...dataInput] = this.checkValueInput();

            if (dataInput[0] == "" || dataInput[1] == "") {
                alert("Bạn chưa điền đủ thông tin");
                return;
            }

            let pass = window.prompt(
                `Bạn muốn thêm : \n Nội Dung : ${dataInput[0]} \n Gía : ${dataInput[1]} \n Loại : ${dataInput[2]} \n Ngày : ${dataInput[3]} \n Nhập Key để thêm `,
                ""
            );
            if (window.btoa(pass) == window.btoa(trung)) {
                let dataPOST = {
                    content: dataInput[0],
                    price: dataInput[2] == "chi" ? -dataInput[1] : dataInput[1],
                    thuchi: dataInput[2],
                    date: dataInput[3],
                };
                CREATE_Courcses(dataPOST);

                alert("Thêm thành công !!!");
                const GET_ALL_INPUT = document.querySelectorAll("input");
                GET_ALL_INPUT.forEach((i) => {
                    i.value = null;
                });
            } else {
                alert("Bạn đã nhập sai");
            }
        });
    },
};

function render(listEvent) {
    const tbody = document.querySelector("tbody");
    let html = listEvent.map((item, index) => {
        present(item);
        return `
        <tr>
            <td>
                <p>${item.id}</p>
            </td>
            <td>
                <p>${item.content}</p>
            </td>
            <td>
                <p>${item.price}</p>
            </td>
            <td>
                <p>${item.date}</p>
            </td>
        </tr>
        `;
    });

    tbody.innerHTML = html.join(" ");
}

function GET_Courcses(callback) {
    fetch(API_POST)
        .then((res) => res.json())
        .then(callback);
}
function CREATE_Courcses(data, callback) {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(API_POST, option)
        .then((res) => res.json())
        .then(callback);
}


function present(trung) {
    const GET_present = document.querySelector(".statistics__item.present .statistics__item--view p")
    let money = Number(trung.price)
    GET_present.innerHTML =  money + Number(GET_present.innerHTML)
    
    if(trung.price > 0){
        total(trung.price)
        console.log(trung.price);
    }
}
function total(trung) {
    const GET_total = document.querySelector(".statistics__item.total .statistics__item--view p")
    let money = Number(trung)
    
    GET_total.innerHTML =  money + Number(GET_total.innerHTML)
}

// function formatMoney(money) {
//     return new Intl.NumberFormat('vi-VN', {currency: 'VND' }).format(money)
// }

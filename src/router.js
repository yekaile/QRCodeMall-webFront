import VueRouter from "vue-router";
import Person from "./pages/person/Person";
import PersonIndex from "./pages/person/PersonIndex";
import PersonAddress from "./pages/person/PersonAddress";
import SafeConfig from "./pages/person/SafeConfig";
import UpdatePassword from "./pages/person/UpdatePassword";
import UpdatePhone from "./pages/person/UpdatePhone";
import UpdateEmail from "./pages/person/UpdateEmail";
import PersonInfo from "./pages/person/PersonInfo";
import PersonOrderForm from "./pages/person/PersonOrderForm";
import PersonBill from "./pages/person/PersonBill";
import AddQRcode from "./pages/person/AddQRcode";
import QRCode from "./pages/person/QRCode";
import UpdateQRcode from "./pages/person/UpdateQRCode";
import MailQrcode from "./pages/person/MailQrcode";
import Account from "./pages/person/Account";
import QrCodeBatch from "./pages/person/QrCodeBatch";
import Point from "./pages/person/Point";
import Public from "./pages/public/Public";
import PublicIndex from "./pages/public/PublicIndex";
import AddOrderForms from "./pages/public/AddOrderForms";
import ShopCart from "./pages/public/ShopCart";
import SearchGoods from "./pages/public/SearchGoods";
import Register from "./pages/public/Register";
import Notices from "./pages/public/Notices";
import NoticeDetail from "./pages/public/NoticeDetail";
import GoodsDetail from "./pages/public/GoodsDetail";
import AddOneOrderForm from "./pages/public/AddOneOrderForm";
import ForgetPassword from "./pages/public/ForgetPassword";
import Vue from "vue";


Vue.use(VueRouter);
let router = new VueRouter({
    mode: 'history',
    routes: [

        {
            path: '/',
            redirect: '/public'

        },

        {
            path: '/person',
            components: {
                person: Person,

            },

            children: [
                {
                    path: "/",
                    component: PersonIndex
                },

                {
                    path: "address",
                    component: PersonAddress
                },
                {
                    path: "safety",
                    component: SafeConfig
                }
                , {
                    path: "updatePassword",
                    component: UpdatePassword
                }
                , {
                    path: "updatePhone",
                    component: UpdatePhone
                }
                , {
                    path: "updateEmail",
                    component: UpdateEmail
                }
                , {
                    path: "personInfo",
                    component: PersonInfo
                }, {
                    path: "order",
                    component: PersonOrderForm
                }, {
                    path: "bill",
                    component: PersonBill
                },
                {
                    path: "addQRcode",
                    component: AddQRcode
                },
                {
                    path: "qrcode",
                    component: QRCode
                } , {
                    path: "updateQrcode",
                    component: UpdateQRcode
                },
                {
                    path: "mailQrcode",
                    component: MailQrcode
                },
                {
                    path: "account",
                    component: Account
                },
                {
                    path: "qrcodeBatch",
                    component: QrCodeBatch
                },
                {
                    path: "point",
                    component: Point
                },



            ]
        },
        {
            path: '/public',
            components: {
                default: Public,
                public: Public,

            },
            children: [
                {
                    path: '/',
                    component: PublicIndex
                }, {
                    path: 'addOrderForms',
                    component: AddOrderForms
                },
                {
                    path: 'shopcart',
                    component: ShopCart
                },
                {
                    path: 'searchGoods',
                    component: SearchGoods
                },
                {
                    path: 'register',
                    component: Register,
                    name: Register,
                },

                {
                    path: 'notices',
                    component: Notices
                },
                {
                    path: 'notice',
                    component: NoticeDetail,
                    name: NoticeDetail
                },
                {
                    path: 'goods',
                    component: GoodsDetail
                }, {
                    path: 'addOneOrderForm',
                    component: AddOneOrderForm
                }, {
                    path: 'forgetPassword',
                    component: ForgetPassword
                }
            ],
        }
    ]
});

router.beforeEach((to, from, next) => {
    var routers = to.path.split("/");
    console.log(routers);
    var user = sessionStorage.getItem('user');
    var fatherRouter = routers[1];
    if (fatherRouter === 'person' && user === null) {
        alert("请登录");
        next("/public");
    } else {
        next();
    }
})

export {router}

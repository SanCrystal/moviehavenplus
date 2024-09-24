import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
	CoRedis,
	HiSolidCollection,
	BiArrowLeftRight,
	GiCastle,
	FaSearchengin,
	MdDoublearrowTwotone,
	MdKeyboarddoublearrowdownSharp,
	SiTrendmicro,
	GiFlame,
	CoComposer,
	MdLivetvTwotone,
	RiMovie2Fill,
	RiMovieFill,
	SiFoodpanda,
	MdLightmodeOutlined,
	MdNightlightSharp,
	RiInformationFill,
	BiPlayBtnFill,
	IoPersonAddSharp,
} from "oh-vue-icons/icons";

//pages component
import Home from "./pages/Index.vue";
import Details from "./pages/Details.vue";

addIcons(
	CoRedis,
	HiSolidCollection,
	BiArrowLeftRight,
	GiCastle,
	FaSearchengin,
	MdDoublearrowTwotone,
	MdKeyboarddoublearrowdownSharp,
	SiTrendmicro,
	GiFlame,
	CoComposer,
	MdLivetvTwotone,
	RiMovie2Fill,
	RiMovieFill,
	SiFoodpanda,
	MdLightmodeOutlined,
	MdNightlightSharp,
	BiArrowLeftRight,
	RiInformationFill,
	BiPlayBtnFill,
	IoPersonAddSharp
);
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: Home },
		{ path: "/details/:movieid(\\d+)", component: Details },
	],
});

createApp(App).use(router).component("v-icon", OhVueIcon).mount("#app");

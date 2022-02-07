/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Math/Buffer2D.ts":
/*!******************************!*\
  !*** ./src/Math/Buffer2D.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RGBA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RGBA */ "./src/Math/RGBA.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");


var Buffer2D = /** @class */ (function () {
    function Buffer2D(w, h) {
        this.w = w;
        this.h = h;
        this.buffer = new Array(this.h);
        console.log(w, h);
        for (var y = 0; y < this.h; ++y) {
            this.buffer[y] = new Array(this.w);
        }
    }
    Buffer2D.prototype.set = function (x, y, value) {
        if (this.is_legal_index(x, y))
            this.buffer[y][x] = value;
        else {
            console.log('set', this.w, this.h, x, y);
            return _RGBA__WEBPACK_IMPORTED_MODULE_0__["default"].debug;
        }
    };
    Buffer2D.prototype.get = function (x, y) {
        if (this.is_legal_index(x, y))
            return this.buffer[y][x];
        else {
            console.log('get', this.w, this.h, x, y);
            return _RGBA__WEBPACK_IMPORTED_MODULE_0__["default"].debug;
        }
    };
    Buffer2D.prototype.clear = function (value) {
        for (var y = 0; y < this.h; ++y) {
            for (var x = 0; x < this.w; ++x) {
                this.buffer[y][x] = value;
            }
        }
    };
    // 超過邊界就使用邊界值
    Buffer2D.prototype.get_clamp_mode = function (x, y) {
        var nx = (0,_Tool__WEBPACK_IMPORTED_MODULE_1__.clamp)(x, 0, this.w - 1);
        var ny = (0,_Tool__WEBPACK_IMPORTED_MODULE_1__.clamp)(y, 0, this.h - 1);
        return this.buffer[ny][nx];
    };
    Buffer2D.prototype.is_legal_index = function (x, y) {
        if (x >= 0 && x < this.w && y >= 0 && y < this.h)
            return true;
        else
            return false;
    };
    Buffer2D.prototype.is_over_negative = function (x, y, endX, endY) {
        if (y > endY || x < endX)
            return true;
        else
            return false;
    };
    Buffer2D.prototype.is_over_positive = function (x, y, endX, endY) {
        if (y > endY || x > endX)
            return true;
        else
            return false;
    };
    return Buffer2D;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Buffer2D);


/***/ }),

/***/ "./src/Math/CanvasHelper.ts":
/*!**********************************!*\
  !*** ./src/Math/CanvasHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var CavnasHelper = /** @class */ (function () {
    function CavnasHelper() {
    }
    CavnasHelper.set_canvas = function (id, w, h) {
        var canvas = document.getElementById(id);
        return CavnasHelper.set_canvas_element(canvas, w, h);
    };
    CavnasHelper.set_canvas_element = function (canvas, w, h) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        return canvas;
    };
    CavnasHelper.get_context = function (id) {
        var canvas = document.getElementById(id);
        return canvas.getContext('2d');
    };
    CavnasHelper.get_context_by_canvas = function (canvas) {
        return canvas.getContext('2d');
    };
    CavnasHelper.convert = function (c) {
        return 'rgba(' + Math.floor(255 * (c.r)) + ',' + Math.floor(255 * (c.g)) + ',' + Math.floor(255 * (c.b)) + ',1)';
    };
    return CavnasHelper;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CavnasHelper);


/***/ }),

/***/ "./src/Math/HHelper.ts":
/*!*****************************!*\
  !*** ./src/Math/HHelper.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var HHelper = /** @class */ (function () {
    function HHelper() {
    }
    HHelper.$ = function (id) {
        return document.getElementById(id);
    };
    return HHelper;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HHelper);


/***/ }),

/***/ "./src/Math/Plane.ts":
/*!***************************!*\
  !*** ./src/Math/Plane.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");


// 平面
var Plane = /** @class */ (function () {
    function Plane(point, normal) {
        this.C = point;
        this.N = normal;
    }
    // 測試tesp_p和方向量是不是在同一邊
    Plane.prototype.is_positive = function (test_p) {
        var diff = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(test_p, this.C);
        var value = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(diff, this.N);
        return value > 0;
    };
    Plane.prototype.hit = function (ray, s) {
        var result = Plane.hit(ray, this);
        if (result)
            result.s = s;
        return result;
    };
    Plane.hit = function (ray, plane) {
        // ray hit plane 
        var from = ray.from;
        var dir = ray.dir;
        // (F-C)。N + t (D。N) = 0
        // t  = (C-F)。N / (D。N)
        // t  = (A / (B)
        var B = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(dir, plane.N);
        var A = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(plane.C, from), plane.N);
        // avoid divide by 0
        if ((0,_Tool__WEBPACK_IMPORTED_MODULE_1__.number_equal)(B, 0))
            return null;
        var t = A / B;
        var positive_t = t > 0.0;
        var hit_pos = from.add(dir.multiply(t));
        return {
            positive_t: positive_t,
            hit_pos: hit_pos,
            i: dir,
            t: t,
            normal: plane.N
        };
    };
    return Plane;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Plane);


/***/ }),

/***/ "./src/Math/RGBA.ts":
/*!**************************!*\
  !*** ./src/Math/RGBA.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");

var RGBA = /** @class */ (function () {
    function RGBA(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    RGBA.lerp = function (A, B, k) {
        return new RGBA((0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(A.r, B.r, k), (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(A.g, B.g, k), (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(A.b, B.b, k), 1);
    };
    RGBA.prototype.add = function (A) {
        return new RGBA(this.r + A.r, this.g + A.g, this.b + A.b, 1);
    };
    RGBA.prototype.multiply = function (s) {
        return new RGBA(this.r * s, this.g * s, this.b * s, 1);
    };
    RGBA.prototype.toString = function () {
        return "( " + this.r + " , " + this.g + " , " + this.b + " )";
    };
    RGBA.debug = new RGBA(1, 0, 1, 1);
    RGBA.golden = new RGBA(1, 215 / 255, 0, 1);
    RGBA.yellow = new RGBA(1, 1, 0, 1);
    RGBA.pink = new RGBA(1, 192 / 255, 203 / 255, 1);
    RGBA.black = new RGBA(0, 0, 0, 1);
    RGBA.red = new RGBA(1, 0, 0, 1);
    return RGBA;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RGBA);


/***/ }),

/***/ "./src/Math/Rasterizer.ts":
/*!********************************!*\
  !*** ./src/Math/Rasterizer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform */ "./src/Math/Transform.ts");
/* harmony import */ var _Triangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Triangle */ "./src/Math/Triangle.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _RGBA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RGBA */ "./src/Math/RGBA.ts");
/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Vector2D */ "./src/Math/Vector2D.ts");






var Rasterizer = /** @class */ (function () {
    function Rasterizer() {
    }
    Rasterizer.clear = function (color, z) {
        Rasterizer.color_buffer.clear(color);
        Rasterizer.z_buffer.clear(z);
    };
    Rasterizer.show = function (render_target) {
        render_target.set_pixel(function (x, y) {
            return Rasterizer.color_buffer.get(x, y);
        });
        render_target.show_buffer('canvas');
    };
    Rasterizer.clip_helper = function (in_list, v0_out, v1_out, v2_out, plane) {
        var out_list = [];
        for (var _i = 0, in_list_1 = in_list; _i < in_list_1.length; _i++) {
            var T = in_list_1[_i];
            var result = (0,_Tool__WEBPACK_IMPORTED_MODULE_2__.clip)(T, v0_out, v1_out, v2_out, plane);
            for (var _a = 0, result_1 = result; _a < result_1.length; _a++) {
                var t = result_1[_a];
                out_list.push(t);
            }
        }
        return out_list;
    };
    Rasterizer.clip_in_Projection_Space = function (v0, v1, v2, pcamera) {
        // Todo:執行6個平面的三角形裁切
        // 和y軸夾45度的2個平面、和x軸夾45度的2個平面、還有Nc和Fc
        // https://gpnnotes.blogspot.com/2021/11/blog-post_28.html
        var in_list = [new _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"](v0, v1, v2)];
        // Far
        var out_list = Rasterizer.clip_helper(in_list, function (T) { return T.v0.w < T.v0.p.z; }, function (T) { return T.v1.w < T.v1.p.z; }, function (T) { return T.v2.w < T.v2.p.z; }, _Tool__WEBPACK_IMPORTED_MODULE_2__.ClipPlane.Far);
        // Near
        out_list = Rasterizer.clip_helper(out_list, function (T) { return 0 > T.v0.p.z; }, function (T) { return 0 > T.v1.p.z; }, function (T) { return 0 > T.v2.p.z; }, _Tool__WEBPACK_IMPORTED_MODULE_2__.ClipPlane.Near);
        // 不對Right 、Left、Top、Bottom作裁切了
        // 反正在screen space光柵化三角形時也會用邊界裁切
        return out_list;
        // Right
        out_list = Rasterizer.clip_helper(out_list, function (T) { return T.v0.w < T.v0.p.x; }, function (T) { return T.v1.w < T.v1.p.x; }, function (T) { return T.v2.w < T.v2.p.x; }, _Tool__WEBPACK_IMPORTED_MODULE_2__.ClipPlane.Right);
        // Left
        out_list = Rasterizer.clip_helper(out_list, function (T) { return -T.v0.w > T.v0.p.x; }, function (T) { return -T.v1.w > T.v1.p.x; }, function (T) { return -T.v2.w > T.v2.p.x; }, _Tool__WEBPACK_IMPORTED_MODULE_2__.ClipPlane.Left);
        // Top
        out_list = Rasterizer.clip_helper(out_list, function (T) { return T.v0.w < T.v0.p.y; }, function (T) { return T.v1.w < T.v1.p.y; }, function (T) { return T.v2.w < T.v2.p.y; }, _Tool__WEBPACK_IMPORTED_MODULE_2__.ClipPlane.Top);
        // Bottom
        out_list = Rasterizer.clip_helper(out_list, function (T) { return -T.v0.w > T.v0.p.y; }, function (T) { return -T.v1.w > T.v1.p.y; }, function (T) { return -T.v2.w > T.v2.p.y; }, _Tool__WEBPACK_IMPORTED_MODULE_2__.ClipPlane.Bottom);
        return out_list;
    };
    Rasterizer.MVP_backface_culling_clipping = function (triangle, pcamera, worldTransform) {
        // to world space
        var v0_w = _Transform__WEBPACK_IMPORTED_MODULE_0__["default"].transformPoint(worldTransform, triangle.v0.p);
        var v1_w = _Transform__WEBPACK_IMPORTED_MODULE_0__["default"].transformPoint(worldTransform, triangle.v1.p);
        var v2_w = _Transform__WEBPACK_IMPORTED_MODULE_0__["default"].transformPoint(worldTransform, triangle.v2.p);
        // to camera space
        var v0_c = pcamera.toCameraSpace(v0_w);
        var v1_c = pcamera.toCameraSpace(v1_w);
        var v2_c = pcamera.toCameraSpace(v2_w);
        // to projection space (clip space)
        var v0_p = pcamera.toProjectionSpace(v0_c);
        var v1_p = pcamera.toProjectionSpace(v1_c);
        var v2_p = pcamera.toProjectionSpace(v2_c);
        // back face culling 
        // let v0_test = new Vector(v0_p.x, v0_p.y, v0_c.z);
        // let v1_test = new Vector(v1_p.x, v1_p.y, v1_c.z);
        // let v2_test = new Vector(v2_p.x, v2_p.y, v2_c.z);
        // let normal = Vector.calculate_normal(v0_test, v1_test, v2_test);
        // let center_to_eye = Vector.minus(Vector.zero, Vector.calculate_center(v0_test, v1_test, v2_test)).normalize();
        // 在view space做，不然在clip space做，還要把z用w取代掉，有點搞工
        var normal = _Vector__WEBPACK_IMPORTED_MODULE_3__["default"].calculate_normal(v0_c, v1_c, v2_c);
        var center_to_eye = _Vector__WEBPACK_IMPORTED_MODULE_3__["default"].minus(_Vector__WEBPACK_IMPORTED_MODULE_3__["default"].zero, _Vector__WEBPACK_IMPORTED_MODULE_3__["default"].calculate_center(v0_c, v1_c, v2_c)).normalize();
        var cos_value = _Vector__WEBPACK_IMPORTED_MODULE_3__["default"].dot(normal, center_to_eye);
        ;
        if (cos_value <= 0) {
            // console.log('culling')
            return [];
        }
        // 重新綁定uv
        var v0 = triangle.v0.clone().update_p(v0_p).update_w(v0_c.z);
        var v1 = triangle.v1.clone().update_p(v1_p).update_w(v1_c.z);
        var v2 = triangle.v2.clone().update_p(v2_p).update_w(v2_c.z);
        // 執行三角形裁切
        return Rasterizer.clip_in_Projection_Space(v0, v1, v2, pcamera);
    };
    Rasterizer.set_peek_screen_pos = function (peek_screen_pos) {
        Rasterizer.peek_screen_pos = peek_screen_pos;
    };
    Rasterizer.print_peek_position = function () {
        Rasterizer.print_once = true;
        console.log('print_peek_position');
    };
    Rasterizer.process = function (triangle, pcamera, worldTransform, texture) {
        // to MVP
        var triangle_list = Rasterizer.MVP_backface_culling_clipping(triangle, pcamera, worldTransform);
        var list = [];
        var count = 0;
        // to NDC
        for (var _i = 0, triangle_list_1 = triangle_list; _i < triangle_list_1.length; _i++) {
            var T = triangle_list_1[_i];
            var n0 = pcamera.toNDC(T.v0.p, T.v0.w);
            var n1 = pcamera.toNDC(T.v1.p, T.v1.w);
            var n2 = pcamera.toNDC(T.v2.p, T.v2.w);
            // NDC應該要落在
            // -1 ≤ x ≤ 1, -1 ≤ y ≤ 1
            // 不裁切left、right、top、bottom，然後clamp ndc也算是一種特殊效果
            if (Rasterizer.ndc_clamp_effect) {
                n0.clamp_x(-1, 1).clamp_y(-1, 1);
                n1.clamp_x(-1, 1).clamp_y(-1, 1);
                n2.clamp_x(-1, 1).clamp_y(-1, 1);
            }
            // to screen space
            // 0 ≤ x ≤ w, 0 ≤ y ≤ h
            var s0 = pcamera.toScreenSpace(n0);
            var s1 = pcamera.toScreenSpace(n1);
            var s2 = pcamera.toScreenSpace(n2);
            // 為了和本來的code相容，暫時先傳出去
            list.push(s0);
            list.push(s1);
            list.push(s2);
            // 找出包圍的矩形
            // https://gpnnotes.blogspot.com/2021/11/blog-post_28.html
            // 圖 Screen Space
            var _a = _Vector__WEBPACK_IMPORTED_MODULE_3__["default"].min_max(s0, s1, s2), min = _a.min, max = _a.max;
            // console.log(min.x, max.x, '|', min.y, max.y);
            var min_x = Math.floor(min.x);
            var max_x = Math.floor(max.x);
            var min_y = Math.floor(min.y);
            var max_y = Math.floor(max.y);
            // clamp by screen size
            min_x = Math.max(0, min_x);
            min_y = Math.max(0, min_y);
            max_x = Math.min(this.color_buffer.w - 1, max_x);
            max_y = Math.min(this.color_buffer.h - 1, max_y);
            var all = (max_x - min_x) * (max_y - min_y);
            var draw = 0;
            var half_w_pixel = 0.5 / Rasterizer.color_buffer.w;
            var half_h_pixel = 0.5 / Rasterizer.color_buffer.h;
            // console.log(half_w_pixel, half_h_pixel);
            for (var x = min_x; x <= max_x; ++x) {
                for (var y = min_y; y <= max_y; ++y) {
                    // https://gpnnotes.blogspot.com/2021/11/blog-post_28.html
                    // 圖 Screen Space
                    var P = new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](x + 0.5, y + 0.5, 0);
                    // 對矩形裡的每個點P
                    // 判定是否位在screen space三角形裡面
                    var _b = _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"]["calculate_α_β_γ"](s0, s1, s2, P), success = _b.success, α = _b.α, β = _b.β, γ = _b.γ;
                    if (!success)
                        continue;
                    if (Rasterizer.print_once && x == Rasterizer.peek_screen_pos.x && y == Rasterizer.peek_screen_pos.y) {
                        console.log('is_in_triangle', _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"].is_in_triangle(α, β, γ), α, β, γ);
                    }
                    if (!_Triangle__WEBPACK_IMPORTED_MODULE_1__["default"].is_in_triangle(α, β, γ))
                        continue;
                    // if yes 
                    // (1)計算z值 
                    // 從NDC到Screen Space是仿射變換，內插權重α、β、γ一樣
                    // https://gpnnotes.blogspot.com/2019/11/blog-post_30.html
                    var z = _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"].interpolation(γ, α, β, n0.z, n1.z, n2.z);
                    // z test
                    var buffer_z = Rasterizer.z_buffer.get(x, y);
                    if (z > buffer_z)
                        continue;
                    // 寫入z值
                    Rasterizer.z_buffer.set(x, y, z);
                    // (2)在NDC進行內插，乘上w回到projection space
                    // https://gpnnotes.blogspot.com/2021/11/blog-post_27.html
                    var w = 1 / _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"].interpolation(γ, α, β, 1 / T.v0.w, 1 / T.v1.w, 1 / T.v2.w);
                    // 要在NDC插值，所以除以w
                    var u_ndc = _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"].interpolation(γ, α, β, T.v0.u / T.v0.w, T.v1.u / T.v1.w, T.v2.u / T.v2.w);
                    var v_ndc = _Triangle__WEBPACK_IMPORTED_MODULE_1__["default"].interpolation(γ, α, β, T.v0.v / T.v0.w, T.v1.v / T.v1.w, T.v2.v / T.v2.w);
                    // projection space 
                    var u = u_ndc * w;
                    var v = v_ndc * w;
                    var color = texture.get(new _Vector2D__WEBPACK_IMPORTED_MODULE_5__["default"](u, v)).color;
                    if (Rasterizer.use_solid_color)
                        Rasterizer.color_buffer.set(x, y, _RGBA__WEBPACK_IMPORTED_MODULE_4__["default"].yellow);
                    else
                        Rasterizer.color_buffer.set(x, y, color);
                    draw++;
                    if (Rasterizer.print_once && x == Rasterizer.peek_screen_pos.x && y == Rasterizer.peek_screen_pos.y) {
                        console.log('在三角形內', color);
                    }
                }
            }
            count++;
            // console.log(count, Math.floor(100 * draw / all));
        }
        if (Rasterizer.print_once) {
            Rasterizer.print_once = false;
            console.log('finish peek');
        }
        return list;
    };
    Rasterizer.use_solid_color = false;
    Rasterizer.ndc_clamp_effect = false;
    Rasterizer.print_once = false;
    return Rasterizer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rasterizer);


/***/ }),

/***/ "./src/Math/Ray.ts":
/*!*************************!*\
  !*** ./src/Math/Ray.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ray = /** @class */ (function () {
    function Ray(from, dir) {
        this.from = from;
        this.dir = dir;
    }
    return Ray;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ray);
;


/***/ }),

/***/ "./src/Math/Ray4D.ts":
/*!***************************!*\
  !*** ./src/Math/Ray4D.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Vector4D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector4D */ "./src/Math/Vector4D.ts");


// 在3D space裁切的話
// 還要考慮什麼時候要用(x,y,w)裁切
// 什麼時候要用(x,y,z)裁切
// 
// 不如直接在4D space裁切
// https://gpnnotes.blogspot.com/2021/11/blog-post_28.html
// 圖 4D space clip
// 這裡用Directx的NDC
var Ray4D = /** @class */ (function () {
    function Ray4D(from, to) {
        this.from = from;
        this.dir = new _Vector4D__WEBPACK_IMPORTED_MODULE_1__["default"](_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(to.p, from.p), to.w - from.w);
    }
    Ray4D.prototype.t_when_x_equal_w = function () {
        // from.x + t * dir.x= from.w + t * dir.w;
        var t = (this.from.w - this.from.p.x) / (this.dir.p.x - this.dir.w);
        return t;
    };
    Ray4D.prototype.t_when_y_equal_w = function () {
        var t = (this.from.w - this.from.p.y) / (this.dir.p.y - this.dir.w);
        return t;
    };
    Ray4D.prototype.t_when_z_equal_w = function () {
        var t = (this.from.w - this.from.p.z) / (this.dir.p.z - this.dir.w);
        return t;
    };
    Ray4D.prototype.t_when_x_equal_minus_w = function () {
        // from.x + t * dir.x= -(from.w + t * dir.w);
        var t = -(this.from.w + this.from.p.x) / (this.dir.w + this.dir.p.x);
        return t;
    };
    Ray4D.prototype.t_when_y_equal_minus_w = function () {
        var t = -(this.from.w + this.from.p.y) / (this.dir.w + this.dir.p.y);
        return t;
    };
    Ray4D.prototype.t_when_z_equal_zero_w = function () {
        // from.z + t * dir.z= 0;
        var t = -this.from.p.z / this.dir.p.z;
        return t;
    };
    return Ray4D;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ray4D);
;


/***/ }),

/***/ "./src/Math/Sampler.ts":
/*!*****************************!*\
  !*** ./src/Math/Sampler.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RGBA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RGBA */ "./src/Math/RGBA.ts");
/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector2D */ "./src/Math/Vector2D.ts");


var Sampler = /** @class */ (function () {
    function Sampler() {
    }
    Sampler.uv_to_buffer_space = function (uv) {
        return new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](uv.x, 1 - uv.y);
    };
    Sampler.buffer_to_uv_space = function (uv) {
        return new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](uv.x, 1 - uv.y);
    };
    Sampler.texture2D = function (uv, buffer) {
        var w = buffer.w;
        var h = buffer.h;
        var buffer_uv = Sampler.uv_to_buffer_space(uv);
        var u = buffer_uv.x;
        var v = buffer_uv.y;
        //先找出最近點
        var grid_u = 1 / w;
        var grid_v = 1 / h;
        var half_grid_u = grid_u * 0.5;
        var half_grid_v = grid_v * 0.5;
        //以下是有4個鄰點的情況..
        var nearest_point_u_float = u / grid_u;
        var nearest_point_v_float = v / grid_v;
        var nearest_point_u = Math.floor(nearest_point_u_float);
        var nearest_point_v = Math.floor(nearest_point_v_float);
        //alert(nearest_point_u+","+nearest_point_v);
        //在「最近點」格裡的local uv
        var s_u = u % grid_u;
        var s_v = v % grid_v;
        //再找出相鄰3點
        if (s_u >= half_grid_u && s_v >= half_grid_v) //相鄰3點在右下
         {
            //剛好整除時要做修正
            if (nearest_point_u_float == nearest_point_u)
                nearest_point_u = nearest_point_u - 1;
            if (nearest_point_v_float == nearest_point_v)
                nearest_point_v = nearest_point_v - 1;
            var P = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](nearest_point_u, nearest_point_v);
            // 右下
            var NE = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x + 1, P.y);
            var SW = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x, P.y + 1);
            var SE = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x + 1, P.y + 1);
            //在4點內的uv
            var rectUV = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"]((s_u - half_grid_u) / grid_u, (s_v - half_grid_v) / grid_v);
            return { rectUV: rectUV, NW: P, NE: NE, SW: SW, SE: SE, color: Sampler.Bilinear_Sampler(rectUV, P, NE, SW, SE, buffer) };
        }
        else if (s_u <= half_grid_u && s_v >= half_grid_v) //相鄰3點在左下
         {
            //剛好整除時要做修正
            if (nearest_point_v_float == nearest_point_v)
                nearest_point_v = nearest_point_v - 1;
            var P = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](nearest_point_u, nearest_point_v);
            // 左下
            var NW = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x - 1, P.y);
            var SW = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x - 1, P.y + 1);
            var SE = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x, P.y + 1);
            //在4點內的uv
            var rectUV = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"]((s_u + half_grid_u) / grid_u, (s_v - half_grid_v) / grid_v);
            return { rectUV: rectUV, NW: NW, NE: P, SW: SW, SE: SE, color: Sampler.Bilinear_Sampler(rectUV, NW, P, SW, SE, buffer) };
        }
        else if (s_u <= half_grid_u && s_v <= half_grid_v) //相鄰3點在左上
         {
            var P = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](nearest_point_u, nearest_point_v);
            // 左上
            var NW = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x - 1, P.y - 1);
            var NE = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x, P.y - 1);
            var SW = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x - 1, P.y);
            //在4點內的uv
            var rectUV = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"]((s_u + half_grid_u) / grid_u, (s_v + half_grid_v) / grid_v);
            return { rectUV: rectUV, NW: NW, NE: NE, SW: SW, SE: P, color: Sampler.Bilinear_Sampler(rectUV, NW, NE, SW, P, buffer) };
        }
        // else if (s_u >= half_grid_u && s_v <= half_grid_v)//相鄰3點在右上
        else {
            //剛好整除時要做修正
            if (nearest_point_u_float == nearest_point_u)
                nearest_point_u = nearest_point_u - 1;
            var P = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](nearest_point_u, nearest_point_v);
            // 右上
            var NW = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x, P.y - 1);
            var NE = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x + 1, P.y - 1);
            var SE = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"](P.x + 1, P.y);
            //在4點內的uv
            var rectUV = new _Vector2D__WEBPACK_IMPORTED_MODULE_1__["default"]((s_u - half_grid_u) / grid_u, (s_v + half_grid_v) / grid_v);
            return { rectUV: rectUV, NW: NW, NE: NE, SW: P, SE: SE, color: Sampler.Bilinear_Sampler(rectUV, NW, NE, P, SE, buffer) };
        }
    };
    Sampler.Bilinear_Sampler = function (rectUV, NW, NE, SW, SE, buffer) {
        //對4個點顏色作內插
        var NWc = buffer.get_clamp_mode(NW.x, NW.y);
        var NEc = buffer.get_clamp_mode(NE.x, NE.y);
        var SWc = buffer.get_clamp_mode(SW.x, SW.y);
        var SEc = buffer.get_clamp_mode(SE.x, SE.y);
        var nRGB = _RGBA__WEBPACK_IMPORTED_MODULE_0__["default"].lerp(NWc, NEc, rectUV.x);
        var sRGB = _RGBA__WEBPACK_IMPORTED_MODULE_0__["default"].lerp(SWc, SEc, rectUV.x);
        var middleRGB = _RGBA__WEBPACK_IMPORTED_MODULE_0__["default"].lerp(nRGB, sRGB, rectUV.y);
        return middleRGB;
    };
    return Sampler;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sampler);


/***/ }),

/***/ "./src/Math/Tool.ts":
/*!**************************!*\
  !*** ./src/Math/Tool.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "degree_to_Rad": () => (/* binding */ degree_to_Rad),
/* harmony export */   "epsilon": () => (/* binding */ epsilon),
/* harmony export */   "number_equal": () => (/* binding */ number_equal),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "get_hit_sort_list": () => (/* binding */ get_hit_sort_list),
/* harmony export */   "get_shadow_weight": () => (/* binding */ get_shadow_weight),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "ClipPlane": () => (/* binding */ ClipPlane),
/* harmony export */   "clip": () => (/* binding */ clip),
/* harmony export */   "MathHelper": () => (/* binding */ MathHelper),
/* harmony export */   "DrawHelper": () => (/* binding */ DrawHelper)
/* harmony export */ });
/* harmony import */ var _Ray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ray */ "./src/Math/Ray.ts");
/* harmony import */ var _Ray4D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ray4D */ "./src/Math/Ray4D.ts");
/* harmony import */ var _Triangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Triangle */ "./src/Math/Triangle.ts");
/* harmony import */ var _Vertex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vertex */ "./src/Math/Vertex.ts");
/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Vector2D */ "./src/Math/Vector2D.ts");





function degree_to_Rad(d) {
    return Math.PI * d / 180;
}
;
var epsilon = 0.001;
function number_equal(a, b) {
    return Math.abs(a - b) < epsilon;
}
function clamp(x, min, max) {
    if (x > max)
        return max;
    else if (x < min)
        return min;
    else
        return x;
}
function get_hit_sort_list(obj_list, ray) {
    var list = obj_list.map(function (obj) { return obj.h.hit(ray, obj.s); });
    var hit_list = (list.filter(function (info) { return info != null && info.positive_t; }));
    return hit_list.sort(function (a, b) { return a.t - b.t; });
}
function get_shadow_weight(hit_info, direction_light_dir, obj_list) {
    // 是否在影子內
    var dir = direction_light_dir.negative();
    var from = hit_info.hit_pos.add(dir.multiply(epsilon)); // 偏移一小段距離，避免射中自己
    var ray = new _Ray__WEBPACK_IMPORTED_MODULE_0__["default"](from, dir);
    var hit_sort_list = get_hit_sort_list(obj_list, ray);
    if (hit_sort_list.length != 0) { // 在影子內
        return 0.45; // 不要太黑
    }
    else
        return 1;
}
function lerp(a, b, t) {
    return a + t * (b - a);
}
var ClipPlane;
(function (ClipPlane) {
    ClipPlane[ClipPlane["Near"] = 0] = "Near";
    ClipPlane[ClipPlane["Far"] = 1] = "Far";
    ClipPlane[ClipPlane["Right"] = 2] = "Right";
    ClipPlane[ClipPlane["Left"] = 3] = "Left";
    ClipPlane[ClipPlane["Top"] = 4] = "Top";
    ClipPlane[ClipPlane["Bottom"] = 5] = "Bottom";
})(ClipPlane || (ClipPlane = {}));
function clip(triangle, v0_out, v1_out, v2_out, plane) {
    var v_clip = [];
    var getCrossPoint = function (v0, v1) {
        var ray = new _Ray4D__WEBPACK_IMPORTED_MODULE_1__["default"](v0.get_Vector4D(), v1.get_Vector4D());
        var t = 0;
        switch (plane) {
            case ClipPlane.Far:
                t = ray.t_when_z_equal_w();
                break;
            case ClipPlane.Near:
                t = ray.t_when_z_equal_zero_w();
                break;
            case ClipPlane.Right:
                t = ray.t_when_x_equal_w();
                break;
            case ClipPlane.Left:
                t = ray.t_when_x_equal_minus_w();
                break;
            case ClipPlane.Top:
                t = ray.t_when_y_equal_w();
                break;
            case ClipPlane.Bottom:
                t = ray.t_when_y_equal_minus_w();
                break;
        }
        return _Vertex__WEBPACK_IMPORTED_MODULE_3__["default"].lerp(v0, v1, t);
    };
    // vo in 
    var clip_first_in = function (v0, v1, v2) {
        // 1 triangle to 1 triangle
        // console.log('one');
        v_clip[0] = new _Triangle__WEBPACK_IMPORTED_MODULE_2__["default"](v0, getCrossPoint(v0, v1), getCrossPoint(v0, v2));
    };
    // vo out
    var clip_first_out = function (v0, v1, v2) {
        // console.log('two');
        // 1 triangle to 2 triangle
        var cross1 = getCrossPoint(v2, v0);
        var cross2 = getCrossPoint(v0, v1);
        v_clip[0] = new _Triangle__WEBPACK_IMPORTED_MODULE_2__["default"](v2, cross1, cross2);
        v_clip[1] = new _Triangle__WEBPACK_IMPORTED_MODULE_2__["default"](v2, cross2, v1);
    };
    // 有8種情況
    if (v0_out(triangle)) //out
     {
        if (v1_out(triangle)) // out out
         {
            if (v2_out(triangle)) // out out out (no clip)
             {
                // console.log('full out');
            }
            else //out out in
                clip_first_in(triangle.v2, triangle.v0, triangle.v1);
        }
        else //out in 
         {
            if (v2_out(triangle)) //out in out
                clip_first_in(triangle.v1, triangle.v2, triangle.v0);
            else // out in in
                clip_first_out(triangle.v0, triangle.v1, triangle.v2);
        }
    }
    else // in
     {
        if (v1_out(triangle)) // in out 
         {
            if (v2_out(triangle)) // in out out
                clip_first_in(triangle.v0, triangle.v1, triangle.v2);
            else // in out in
                clip_first_out(triangle.v1, triangle.v2, triangle.v0);
        }
        else // in in
         {
            if (v2_out(triangle)) // in in out
                clip_first_out(triangle.v2, triangle.v0, triangle.v1);
            else // in in in (no clip)
             {
                v_clip[0] = triangle;
            }
        }
    }
    return v_clip;
}
var MathHelper = /** @class */ (function () {
    function MathHelper() {
    }
    //修正除法錯誤
    MathHelper.accDiv = function (arg1, arg2) {
        //code from http://8st.blogspot.tw/2012/10/jsbug.html
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) { }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    };
    //修正加法錯誤
    MathHelper.accAdd = function (arg1, arg2) {
        //code from http://8st.blogspot.tw/2012/10/jsbug.html
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            }
            else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        }
        else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    };
    return MathHelper;
}());

// 以前寫的code
var DrawHelper = /** @class */ (function () {
    function DrawHelper() {
    }
    DrawHelper.drawLine = function (one, two, value, buffer) {
        var now = one;
        var to = two;
        var diff = _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"].minus(to, now);
        var step = 100;
        if (diff.y == 0) //horizon
         {
            for (var i = 1; i < step; i++) {
                //左畫到右
                now.x = now.x + 1;
                if (!buffer.is_legal_index(now.x, now.y))
                    break;
                if (now.x > to.x)
                    break;
                buffer.set(now.x, now.y, value);
            }
            return;
        }
        if (diff.x == 0) //vertical
         {
            for (var i = 1; i < step; i++) {
                //上畫到下
                now.y = now.y + 1;
                if (!buffer.is_legal_index(now.x, now.y))
                    break;
                if (now.y > to.y)
                    break;
                buffer.set(now.x, now.y, value);
            }
            return;
        }
        var ratio = diff.x / diff.y;
        var abs_r = Math.abs(ratio);
        if (ratio > 0) {
            if (abs_r <= 1) {
                for (var i = 1; i < step; i++) {
                    now.y = now.y + 1;
                    now.x = now.x + abs_r;
                    var intX = Math.floor(now.x);
                    if (!buffer.is_legal_index(intX, now.y))
                        break;
                    if (buffer.is_over_positive(now.x, now.y, to.x, to.y))
                        break;
                    buffer.set(intX, now.y, value);
                }
            }
            else if (abs_r > 1) {
                for (var i = 1; i < step; i++) {
                    now.y = now.y + 1 / abs_r;
                    now.x = now.x + 1;
                    var intY = Math.floor(now.y);
                    if (!buffer.is_legal_index(now.x, intY))
                        break;
                    if (buffer.is_over_positive(now.x, now.y, to.x, to.y))
                        break;
                    buffer.set(now.x, intY, value);
                }
            }
        }
        else if (ratio < 0) {
            if (abs_r <= 1) {
                for (var i = 1; i < step; i++) {
                    now.y = now.y + 1;
                    now.x = now.x - abs_r;
                    var intX = Math.floor(now.x);
                    if (!buffer.is_legal_index(intX, now.y))
                        break;
                    if (buffer.is_over_negative(now.x, now.y, to.x, to.y))
                        break;
                    buffer.set(intX, now.y, value);
                }
            }
            else if (abs_r > 1) {
                for (var i = 1; i < step; i++) {
                    now.y = now.y + 1 / abs_r;
                    now.x = now.x - 1;
                    var intY = Math.floor(now.y);
                    if (!buffer.is_legal_index(now.x, intY))
                        break;
                    if (buffer.is_over_negative(now.x, now.y, to.x, to.y))
                        break;
                    buffer.set(now.x, intY, value);
                }
            }
        }
    };
    DrawHelper.drawCircle = function (value, buffer) {
        var it = 50;
        var delta = 2 * Math.PI / it;
        var R = 9;
        var center = new _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](10, 10);
        var startTheda = -Math.PI / 3;
        //畫圓
        for (var i = 0; i < it; i++) {
            var nowX = Math.floor(center.x + R * Math.cos(startTheda + delta * i));
            var nowY = Math.floor(center.y + R * Math.sin(startTheda + delta * i));
            var nextX = Math.floor(center.x + R * Math.cos(startTheda + delta * (i + 1)));
            var nextY = Math.floor(center.y + R * Math.sin(startTheda + delta * (i + 1)));
            DrawHelper.drawLineWrapper(new _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](nowX, nowY), new _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](nextX, nextY), value, buffer);
        }
    };
    DrawHelper.drawStar = function (value, buffer) {
        var it = 5;
        var delta = 2 * Math.PI / it;
        var R = 9;
        var center = new _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](10, 10);
        var startTheda = -Math.PI / 3;
        //畫星星
        var k = 0;
        for (var i = 0; i < it; i++) {
            var nowX = Math.floor(center.x + R * Math.cos(startTheda + delta * k));
            var nowY = Math.floor(center.y + R * Math.sin(startTheda + delta * k));
            var nextX = Math.floor(center.x + R * Math.cos(startTheda + delta * (k + 2)));
            var nextY = Math.floor(center.y + R * Math.sin(startTheda + delta * (k + 2)));
            DrawHelper.drawLineWrapper(new _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](nowX, nowY), new _Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](nextX, nextY), value, buffer);
            k = k + 2;
        }
    };
    DrawHelper.drawLineWrapper = function (t0, t1, value, buffer) {
        //從上往下畫
        if (t0.y < t1.y)
            DrawHelper.drawLine(t0, t1, value, buffer);
        else if (t1.y < t0.y)
            DrawHelper.drawLine(t1, t0, value, buffer);
        else //水平線
         {
            //從左往右畫
            if (t0.x < t1.x)
                DrawHelper.drawLine(t0, t1, value, buffer);
            else if (t1.x < t0.x)
                DrawHelper.drawLine(t1, t0, value, buffer);
        }
    };
    return DrawHelper;
}());



/***/ }),

/***/ "./src/Math/Transform.ts":
/*!*******************************!*\
  !*** ./src/Math/Transform.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");


var Transform = /** @class */ (function () {
    function Transform(xAxis, yAxis, zAxis, position) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.zAxis = zAxis;
        this.position = position;
    }
    Transform.transformPoint = function (transform, point) {
        var vectorX = transform.xAxis.multiply(point.x);
        var vectorY = transform.yAxis.multiply(point.y);
        var vectorZ = transform.zAxis.multiply(point.z);
        return transform.position.add(vectorX).add(vectorY).add(vectorZ);
    };
    Transform.transformVector = function (transform, vertex) {
        var vectorX = transform.xAxis.multiply(vertex.x);
        var vectorY = transform.yAxis.multiply(vertex.y);
        var vectorZ = transform.zAxis.multiply(vertex.z);
        return vectorX.add(vectorY).add(vectorZ);
    };
    Transform.transformTransform = function (transform, inputTransform) {
        return new Transform(Transform.transformVector(transform, inputTransform.xAxis), Transform.transformVector(transform, inputTransform.yAxis), Transform.transformVector(transform, inputTransform.zAxis), Transform.transformPoint(transform, inputTransform.position));
    };
    Transform.rotateByZ = function (degree) {
        var radian = (0,_Tool__WEBPACK_IMPORTED_MODULE_1__.degree_to_Rad)(degree);
        var c = Math.cos(radian), s = Math.sin(radian);
        var xAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](c, s, 0);
        var yAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](-s, c, 0);
        var zAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 1);
        return new Transform(xAxis, yAxis, zAxis, _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].zero);
    };
    Transform.rotateByY = function (degree) {
        var radian = (0,_Tool__WEBPACK_IMPORTED_MODULE_1__.degree_to_Rad)(degree);
        var c = Math.cos(radian), s = Math.sin(radian);
        var zAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](s, 0, c);
        var xAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](c, 0, -s);
        var yAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1, 0);
        return new Transform(xAxis, yAxis, zAxis, _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].zero);
    };
    Transform.rotateByX = function (degree) {
        var radian = (0,_Tool__WEBPACK_IMPORTED_MODULE_1__.degree_to_Rad)(degree);
        var c = Math.cos(radian), s = Math.sin(radian);
        var xAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0, 0);
        var yAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, c, s);
        var zAxis = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, -s, c);
        return new Transform(xAxis, yAxis, zAxis, new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 0));
    };
    Transform.offset = function (x, y, z) {
        return new Transform(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0, 0), new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1, 0), new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 1), new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, z));
    };
    return Transform;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transform);


/***/ }),

/***/ "./src/Math/Triangle.ts":
/*!******************************!*\
  !*** ./src/Math/Triangle.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Plane */ "./src/Math/Plane.ts");
/* harmony import */ var _Ray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ray */ "./src/Math/Ray.ts");
/* harmony import */ var _Rasterizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rasterizer */ "./src/Math/Rasterizer.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");





var Triangle = /** @class */ (function () {
    function Triangle(pv0, pv1, pv2) {
        this.v0 = pv0;
        this.v1 = pv1;
        this.v2 = pv2;
        this.v_s = null;
    }
    // 這些點z都是0
    Triangle.calculate_α_β_γ = function (s0, s1, s2, P) {
        var diff = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(P, s0);
        // 求ray(P,S0-S2)和ray(S0,S1-S2)的交點
        // 等同於求ray(P,S0-S2)和平面的交點
        var dir01 = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(s1, s0);
        var dir02 = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(s2, s0);
        var n = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](-dir01.y, dir01.x, 0);
        var ray = new _Ray__WEBPACK_IMPORTED_MODULE_2__["default"](P, dir02.multiply(-1));
        var result = _Plane__WEBPACK_IMPORTED_MODULE_1__["default"].hit(ray, new _Plane__WEBPACK_IMPORTED_MODULE_1__["default"](s0, n));
        if (!result) { // 退化成直線的三角形才有也可能
            // console.log('平行', s0, s1, s2, P);
            // 不處理
            return { success: false, α: 1, β: 0, γ: 0 };
        }
        var p_on_dir01 = result.hit_pos;
        var vector_α = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(p_on_dir01, s0);
        var vector_β = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(diff, vector_α);
        // 擋掉dir01、dir02是y軸平行的情況
        // 浮點數請用 number_equal，不然會GG
        // 見圖：bug/float_point_compaire_error(fixed)/bug_when_clipping_2.jpg
        // 其實當初直接用長度比算α、β不是更簡單嗎？
        var α = (0,_Tool__WEBPACK_IMPORTED_MODULE_4__.number_equal)(dir01.x, 0) ? vector_α.y / dir01.y : vector_α.x / dir01.x;
        var β = (0,_Tool__WEBPACK_IMPORTED_MODULE_4__.number_equal)(dir02.x, 0) ? vector_β.y / dir02.y : vector_β.x / dir02.x;
        if (isNaN(α)) {
            console.log(vector_α.x, dir01.x);
        }
        if (isNaN(β)) {
            console.log(vector_β.x, dir02.x);
        }
        var γ = 1 - α - β;
        return { success: true, α: α, β: β, γ: γ };
    };
    Triangle.is_in_triangle = function (α, β, γ) {
        return (α >= 0 && β >= 0 && γ >= 0);
    };
    // 因為calculate_α_β_γ實作的方式，所以順序是γ、α、β 😝
    Triangle.interpolation = function (γ, α, β, v0, v1, v2) {
        return v0 * γ + v1 * α + v2 * β;
    };
    Triangle.prototype.rasterize = function (pcamera, worldTransform, texture) {
        this.v_s = _Rasterizer__WEBPACK_IMPORTED_MODULE_3__["default"].process(this, pcamera, worldTransform, texture);
    };
    Triangle.prototype.draw = function (ctx) {
        if (this.v_s == null)
            return;
        var tCount = this.v_s.length / 3;
        for (var c = 1; c <= tCount; ++c) {
            var index = 3 * c - 1;
            ctx.moveTo(this.v_s[index].x, this.v_s[index].y);
            ctx.lineTo(this.v_s[index - 2].x, this.v_s[index - 2].y);
            ctx.lineTo(this.v_s[index - 1].x, this.v_s[index - 1].y);
            ctx.lineTo(this.v_s[index].x, this.v_s[index].y);
        }
    };
    return Triangle;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Triangle);


/***/ }),

/***/ "./src/Math/Vector.ts":
/*!****************************!*\
  !*** ./src/Math/Vector.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");

var Vector = /** @class */ (function () {
    function Vector(px, py, pz) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = px;
        this.y = py;
        this.z = pz;
    }
    Vector.min_max = function (v0, v1, v2) {
        var min = new Vector(Math.min(Math.min(v0.x, v1.x), v2.x), Math.min(Math.min(v0.y, v1.y), v2.y), Math.min(Math.min(v0.z, v1.z), v2.z));
        var max = new Vector(Math.max(Math.max(v0.x, v1.x), v2.x), Math.max(Math.max(v0.y, v1.y), v2.y), Math.max(Math.max(v0.z, v1.z), v2.z));
        return { min: min, max: max };
    };
    Vector.calculate_normal = function (v0, v1, v2) {
        var v01 = Vector.minus(v1, v0);
        var v02 = Vector.minus(v2, v0);
        var normal = Vector.cross(v01, v02);
        return normal.normalize();
    };
    Vector.calculate_center = function (v0, v1, v2) {
        return v0.add(v1).add(v2).multiply(1 / 3);
    };
    Vector.uv = function (u, v) {
        return new Vector(u, v, 0);
    };
    Vector.reflect = function (I, N) {
        var L = -2 * Vector.dot(I, N);
        return N.multiply(L).add(I);
    };
    Vector.add = function (A, B) {
        var temp = new Vector(B.x + A.x, B.y + A.y, B.z + A.z);
        return temp;
    };
    Vector.minus = function (A, B) {
        var temp = new Vector(A.x - B.x, A.y - B.y, A.z - B.z);
        return temp;
    };
    Vector.multiply = function (A, s) {
        var temp = new Vector(A.x * s, A.y * s, A.z * s);
        return temp;
    };
    Vector.multiply3 = function (A, B) {
        return new Vector(A.x * B.x, A.y * B.y, A.z * B.z);
    };
    Vector.cross = function (A, B) {
        var temp = new Vector(A.y * B.z - A.z * B.y, -A.x * B.z + A.z * B.x, A.x * B.y - A.y * B.x);
        return temp;
    };
    Vector.dot = function (A, B) {
        return A.x * B.x + A.y * B.y + A.z * B.z;
    };
    Vector.equal = function (A, B) {
        return (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.number_equal)(A.x, B.x) && (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.number_equal)(A.y, B.y) && (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.number_equal)(A.z, B.z);
    };
    Vector.lerp = function (A, B, t) {
        return new Vector((0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(A.x, B.x, t), (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(A.y, B.y, t), (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(A.z, B.z, t));
    };
    Vector.prototype.clamp_x = function (min, max) {
        this.x = (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.x, min, max);
        return this;
    };
    Vector.prototype.clamp_y = function (min, max) {
        this.y = (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.clamp)(this.y, min, max);
        return this;
    };
    Vector.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector.prototype.normalize = function () {
        var temp = this.length();
        this.x = this.x / temp;
        this.y = this.y / temp;
        this.z = this.z / temp;
        return this;
    };
    Vector.prototype.add = function (A) {
        return Vector.add(this, A);
    };
    Vector.prototype.minus = function (A) {
        return Vector.minus(this, A);
    };
    Vector.prototype.multiply = function (s) {
        return Vector.multiply(this, s);
    };
    Vector.prototype.negative = function () {
        return Vector.multiply(this, -1);
    };
    Vector.prototype.Vector2D = function () {
        this.z = 0;
        return this;
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y, this.z);
    };
    Vector.up = new Vector(0, 1, 0);
    Vector.zero = new Vector(0, 0, 0);
    return Vector;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector);


/***/ }),

/***/ "./src/Math/Vector2D.ts":
/*!******************************!*\
  !*** ./src/Math/Vector2D.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.add = function (A, B) {
        var temp = new Vector2D(B.x + A.x, B.y + A.y);
        return temp;
    };
    Vector2D.minus = function (A, B) {
        var temp = new Vector2D(A.x - B.x, A.y - B.y);
        return temp;
    };
    Vector2D.prototype.plus = function (p) {
        return new Vector2D(this.x + p.x, this.y + p.y);
    };
    Vector2D.prototype.multiply = function (s) {
        return new Vector2D(this.x * s, this.y * s);
    };
    Vector2D.prototype.toString = function () {
        return "( " + this.x + " , " + this.y + " )";
    };
    return Vector2D;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector2D);


/***/ }),

/***/ "./src/Math/Vector4D.ts":
/*!******************************!*\
  !*** ./src/Math/Vector4D.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Vector4D = /** @class */ (function () {
    function Vector4D(p, w) {
        this.p = p;
        this.w = w;
    }
    return Vector4D;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector4D);
;


/***/ }),

/***/ "./src/Math/Vertex.ts":
/*!****************************!*\
  !*** ./src/Math/Vertex.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Vector4D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vector4D */ "./src/Math/Vector4D.ts");



var Vertex = /** @class */ (function () {
    function Vertex(p, n, w, u, v) {
        this.p = p;
        this.n = n;
        this.w = w;
        this.u = u;
        this.v = v;
    }
    Vertex.build_vertex = function (p, n, w, u, v) {
        var vertex = new Vertex(p, n, w, u, v);
        return vertex;
    };
    Vertex.lerp = function (v0, v1, t) {
        var p = _Vector__WEBPACK_IMPORTED_MODULE_1__["default"].lerp(v0.p, v1.p, t);
        var n = _Vector__WEBPACK_IMPORTED_MODULE_1__["default"].lerp(v0.n, v1.n, t);
        var w = (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(v0.w, v1.w, t);
        var u = (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(v0.u, v1.u, t);
        var v = (0,_Tool__WEBPACK_IMPORTED_MODULE_0__.lerp)(v0.v, v1.v, t);
        return new Vertex(p, n, w, u, v);
    };
    Vertex.prototype.clone = function () {
        return new Vertex(this.p.clone(), this.n.clone(), this.w, this.u, this.v);
    };
    Vertex.prototype.update_p = function (p) {
        this.p = p;
        return this;
    };
    Vertex.prototype.update_w = function (w) {
        this.w = w;
        return this;
    };
    Vertex.prototype.get_Vector4D = function () {
        return new _Vector4D__WEBPACK_IMPORTED_MODULE_2__["default"](this.p, this.w);
    };
    return Vertex;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vertex);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/TestTextureApp.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Math_Buffer2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Buffer2D */ "./src/Math/Buffer2D.ts");
/* harmony import */ var _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/CanvasHelper */ "./src/Math/CanvasHelper.ts");
/* harmony import */ var _Math_RGBA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math/RGBA */ "./src/Math/RGBA.ts");
/* harmony import */ var _Math_Sampler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Math/Sampler */ "./src/Math/Sampler.ts");
/* harmony import */ var _Math_Vector2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Math/Vector2D */ "./src/Math/Vector2D.ts");
/* harmony import */ var _Math_Tool__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Math/Tool */ "./src/Math/Tool.ts");
/* harmony import */ var _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Math/HHelper */ "./src/Math/HHelper.ts");







var TestTextureApp = /** @class */ (function () {
    function TestTextureApp() {
        var _this = this;
        this.canvas_width = 600;
        this.canvas_height = 600;
        this.row_count = 20;
        this.colume_count = 20;
        this.rect_w = this.canvas_width / this.colume_count;
        this.rect_h = this.canvas_height / this.row_count;
        this.buffer = new _Math_Buffer2D__WEBPACK_IMPORTED_MODULE_0__["default"](this.colume_count, this.row_count);
        window.onload = function () {
            _this.init();
            _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$('btn_reset').onclick = function () {
                _this.Render();
            };
            _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$('move_right').onclick = function () {
                _this.moveRight();
                _this.Render();
            };
            _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$('move_up').onclick = function () {
                _this.moveUp();
                _this.Render();
            };
            _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$('canvas').onclick = function (event) {
                _this.reBulid(new _Math_Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](event.offsetX, event.offsetY));
            };
        };
    }
    TestTextureApp.prototype.texture2D = function (uv) {
        var _a = _Math_Sampler__WEBPACK_IMPORTED_MODULE_3__["default"].texture2D(uv, this.buffer), rectUV = _a.rectUV, NW = _a.NW, NE = _a.NE, SW = _a.SW, SE = _a.SE, color = _a.color;
        //畫4個鄰近點
        this.drawPointByGridIndex(NW);
        this.drawPointByGridIndex(NE);
        this.drawPointByGridIndex(SW);
        this.drawPointByGridIndex(SE);
        this.drawRect(NW);
        this.drawPointByRectUV(NW, rectUV);
        // 顯示最後的結果
        var ctx = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].get_context('canvas2');
        if (!ctx) {
            console.log('ctx get failed');
            return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].convert(color);
        ctx.fillRect(0, 0, 30, 30);
    };
    TestTextureApp.prototype.drawUV = function () {
        var u = parseFloat(_Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("u").value);
        var v = parseFloat(_Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("v").value);
        this.texture2D(new _Math_Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](u, v));
    };
    TestTextureApp.prototype.moveRight = function () {
        var u = parseFloat(_Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("u").value);
        var grid_u = 1 / this.colume_count;
        u = _Math_Tool__WEBPACK_IMPORTED_MODULE_5__.MathHelper.accAdd(u, grid_u);
        _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("u").value = u.toString();
    };
    TestTextureApp.prototype.moveUp = function () {
        var v = parseFloat(_Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("v").value);
        var grid_v = 1 / this.row_count;
        v = _Math_Tool__WEBPACK_IMPORTED_MODULE_5__.MathHelper.accAdd(v, grid_v);
        _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("v").value = v.toString();
    };
    TestTextureApp.prototype.reBulid = function (P) {
        var u = P.x / this.canvas_width;
        var v = P.y / this.canvas_height;
        var buffer_uv = new _Math_Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"](u, v);
        var uv = _Math_Sampler__WEBPACK_IMPORTED_MODULE_3__["default"].buffer_to_uv_space(buffer_uv);
        _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("u").value = uv.x.toString();
        _Math_HHelper__WEBPACK_IMPORTED_MODULE_6__["default"].$("v").value = uv.y.toString();
        this.Render();
    };
    TestTextureApp.prototype.reset = function () {
        for (var x = 0; x < this.colume_count; x++)
            for (var y = 0; y < this.row_count; y++)
                this.buffer.set(x, y, new _Math_RGBA__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0, 0, 1));
    };
    TestTextureApp.prototype.init = function () {
        this.reset();
        _Math_Tool__WEBPACK_IMPORTED_MODULE_5__.DrawHelper.drawStar(_Math_RGBA__WEBPACK_IMPORTED_MODULE_2__["default"].golden, this.buffer);
        this.Render();
    };
    TestTextureApp.prototype.Render = function () {
        this.drawBuffer();
        this.drawUV();
    };
    TestTextureApp.prototype.drawBuffer = function () {
        var ctx = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].get_context('canvas');
        if (!ctx) {
            console.log('ctx get failed');
            return;
        }
        ctx.clearRect(0, 0, 600, 600);
        for (var y = 0; y < this.row_count; y++) {
            for (var x = 0; x < this.colume_count; x++) {
                ctx.beginPath();
                ctx.fillStyle = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].convert(this.buffer.get(x, y));
                var r = 1;
                ctx.fillRect(x * this.rect_w + r, y * this.rect_h + r, this.rect_w - r, this.rect_h - r);
                ctx.stroke();
            }
        }
    };
    TestTextureApp.prototype.drawPointByGridIndex = function (P) {
        var ctx = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].get_context('canvas');
        if (!ctx) {
            console.log('ctx get failed');
            return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,0,1)';
        var r = 6;
        ctx.fillRect((P.x + 0.5) * this.rect_w - 0.5 * r, (P.y + 0.5) * this.rect_h - 0.5 * r, r, r);
        ctx.stroke();
    };
    TestTextureApp.prototype.drawRect = function (P) {
        var ctx = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].get_context('canvas');
        if (!ctx) {
            console.log('ctx get failed');
            return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,0,1)';
        ctx.rect((P.x + 0.5) * this.rect_w, (P.y + 0.5) * this.rect_h, this.rect_w, this.rect_h);
        ctx.stroke();
    };
    //畫出uv點
    TestTextureApp.prototype.drawPointByRectUV = function (P, rectUV) {
        var ctx = _Math_CanvasHelper__WEBPACK_IMPORTED_MODULE_1__["default"].get_context('canvas');
        if (!ctx) {
            console.log('ctx get failed');
            return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,255,0,1)';
        var targetP = new _Math_Vector2D__WEBPACK_IMPORTED_MODULE_4__["default"]((P.x + 0.5) * this.rect_w + this.rect_w * rectUV.x, (P.y + 0.5) * this.rect_h + this.rect_h * rectUV.y);
        var r = 6;
        ctx.fillRect(targetP.x - 0.5 * r, targetP.y - 0.5 * r, r, r);
        ctx.stroke();
    };
    return TestTextureApp;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TestTextureApp);
new TestTextureApp();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5QyxVQUFDLENBQVcsSUFBTyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDOUMsVUFBQyxDQUFXLElBQU8sT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzlDLGtEQUFlLENBQUMsQ0FBQztRQUVyQixPQUFPO1FBQ1AsUUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUN0QyxVQUFDLENBQVcsSUFBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxVQUFDLENBQVcsSUFBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxVQUFDLENBQVcsSUFBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxpREFBYyxDQUFDLENBQUM7UUFFcEIsTUFBTTtRQUNOLFFBQVEsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDdEMsVUFBQyxDQUFXLElBQU8sT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzlDLFVBQUMsQ0FBVyxJQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZJLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkksT0FBTyxFQUFFLEdBQUcsT0FBRSxHQUFHLE9BQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sdUJBQWdCLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVTtRQUN0RCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUs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QUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQzs7QUFFRCxJQUFJLGNBQWMsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL0J1ZmZlcjJELnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9DYW52YXNIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL0hIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1BsYW5lLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9SR0JBLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9SYXN0ZXJpemVyLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9SYXkudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1JheTRELnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9TYW1wbGVyLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9Ub29sLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9UcmFuc2Zvcm0udHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1RyaWFuZ2xlLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1ZlY3RvcjJELnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9WZWN0b3I0RC50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL01hdGgvVmVydGV4LnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmdsX3Rlc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL1Rlc3RUZXh0dXJlQXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSR0JBIGZyb20gXCIuL1JHQkFcIjtcclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL1ZlY3RvcjJEXCI7XHJcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4vVG9vbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVmZmVyMkQ8VD4ge1xyXG4gICAgdzogbnVtYmVyO1xyXG4gICAgaDogbnVtYmVyO1xyXG4gICAgYnVmZmVyOiBBcnJheTxBcnJheTxUPj47XHJcbiAgICBjb25zdHJ1Y3Rvcih3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICAgICAgdGhpcy5oID0gaDtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheTxBcnJheTxUPj4odGhpcy5oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3LCBoKTtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaDsgKyt5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyW3ldID0gbmV3IEFycmF5PFQ+KHRoaXMudyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCh4OiBudW1iZXIsIHk6IG51bWJlciwgdmFsdWU6IFQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19sZWdhbF9pbmRleCh4LCB5KSlcclxuICAgICAgICAgICAgdGhpcy5idWZmZXJbeV1beF0gPSB2YWx1ZTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCcsIHRoaXMudywgdGhpcy5oLCB4LCB5KTtcclxuICAgICAgICAgICAgcmV0dXJuIFJHQkEuZGVidWc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc19sZWdhbF9pbmRleCh4LCB5KSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyW3ldW3hdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0JywgdGhpcy53LCB0aGlzLmgsIHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUkdCQS5kZWJ1ZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIodmFsdWU6IFQpIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaDsgKyt5KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53OyArK3gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW3ldW3hdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6LaF6YGO6YKK55WM5bCx5L2/55So6YKK55WM5YC8XHJcbiAgICBnZXRfY2xhbXBfbW9kZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBueCA9IGNsYW1wKHgsIDAsIHRoaXMudyAtIDEpO1xyXG4gICAgICAgIGxldCBueSA9IGNsYW1wKHksIDAsIHRoaXMuaCAtIDEpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJbbnldW254XTtcclxuICAgIH1cclxuXHJcbiAgICBpc19sZWdhbF9pbmRleCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh4ID49IDAgJiYgeCA8IHRoaXMudyAmJiB5ID49IDAgJiYgeSA8IHRoaXMuaClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaXNfb3Zlcl9uZWdhdGl2ZSh4OiBudW1iZXIsIHk6IG51bWJlciwgZW5kWDogbnVtYmVyLCBlbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoeSA+IGVuZFkgfHwgeCA8IGVuZFgpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzX292ZXJfcG9zaXRpdmUoeDogbnVtYmVyLCB5OiBudW1iZXIsIGVuZFg6IG51bWJlciwgZW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHkgPiBlbmRZIHx8IHggPiBlbmRYKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBSR0JBIGZyb20gXCIuL1JHQkFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdm5hc0hlbHBlciB7XHJcbiAgICBzdGF0aWMgc2V0X2NhbnZhcyhpZDogc3RyaW5nLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIENhdm5hc0hlbHBlci5zZXRfY2FudmFzX2VsZW1lbnQoY2FudmFzLCB3LCBoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0X2NhbnZhc19lbGVtZW50KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcbiAgICAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0X2NvbnRleHQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfY29udGV4dF9ieV9jYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29udmVydChjOiBSR0JBKSB7XHJcbiAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLmZsb29yKDI1NSAqIChjLnIpKSArICcsJyArIE1hdGguZmxvb3IoMjU1ICogKGMuZykpICsgJywnICsgTWF0aC5mbG9vcigyNTUgKiAoYy5iKSkgKyAnLDEpJztcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhIZWxwZXIge1xyXG4gICAgc3RhdGljICQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFJheSBmcm9tICcuL1JheSc7XHJcbmltcG9ydCB7IG51bWJlcl9lcXVhbCB9IGZyb20gJy4vVG9vbCc7XHJcbmltcG9ydCBIaXRJbmZvIGZyb20gJy4vSGl0SW5mbyc7XHJcbmltcG9ydCBIaXRhYmxlIGZyb20gJy4vSGl0YWJsZSc7XHJcbmltcG9ydCBTaGFkZXIgZnJvbSAnLi4vTWF0ZXJhaWxzL1NoYWRlcic7XHJcblxyXG4vLyDlubPpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhbmUgaW1wbGVtZW50cyBIaXRhYmxlIHtcclxuXHJcbiAgICBDOiBWZWN0b3I7XHJcbiAgICBOOiBWZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogVmVjdG9yLCBub3JtYWw6IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuQyA9IHBvaW50O1xyXG4gICAgICAgIHRoaXMuTiA9IG5vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmuKzoqaZ0ZXNwX3DlkozmlrnlkJHph4/mmK/kuI3mmK/lnKjlkIzkuIDpgopcclxuICAgIGlzX3Bvc2l0aXZlKHRlc3RfcDogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGRpZmYgPSBWZWN0b3IubWludXModGVzdF9wLCB0aGlzLkMpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IFZlY3Rvci5kb3QoZGlmZiwgdGhpcy5OKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhpdChyYXk6IFJheSwgczogU2hhZGVyKTogSGl0SW5mbyB8IG51bGwge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBQbGFuZS5oaXQocmF5LCB0aGlzKTtcclxuICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICByZXN1bHQucyA9IHM7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGl0KHJheTogUmF5LCBwbGFuZTogUGxhbmUpOiBIaXRJbmZvIHwgbnVsbCB7XHJcbiAgICAgICAgLy8gcmF5IGhpdCBwbGFuZSBcclxuICAgICAgICBsZXQgZnJvbSA9IHJheS5mcm9tO1xyXG4gICAgICAgIGxldCBkaXIgPSByYXkuZGlyO1xyXG5cclxuICAgICAgICAvLyAoRi1DKeOAgk4gKyB0IChE44CCTikgPSAwXHJcbiAgICAgICAgLy8gdCAgPSAoQy1GKeOAgk4gLyAoROOAgk4pXHJcbiAgICAgICAgLy8gdCAgPSAoQSAvIChCKVxyXG4gICAgICAgIGxldCBCID0gVmVjdG9yLmRvdChkaXIsIHBsYW5lLk4pO1xyXG4gICAgICAgIGxldCBBID0gVmVjdG9yLmRvdChWZWN0b3IubWludXMocGxhbmUuQywgZnJvbSksIHBsYW5lLk4pO1xyXG5cclxuICAgICAgICAvLyBhdm9pZCBkaXZpZGUgYnkgMFxyXG4gICAgICAgIGlmIChudW1iZXJfZXF1YWwoQiwgMCkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgdCA9IEEgLyBCO1xyXG4gICAgICAgIGxldCBwb3NpdGl2ZV90ID0gdCA+IDAuMDtcclxuICAgICAgICBsZXQgaGl0X3BvcyA9IGZyb20uYWRkKGRpci5tdWx0aXBseSh0KSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcG9zaXRpdmVfdCxcclxuICAgICAgICAgICAgaGl0X3BvcyxcclxuICAgICAgICAgICAgaTogZGlyLFxyXG4gICAgICAgICAgICB0LFxyXG4gICAgICAgICAgICBub3JtYWw6IHBsYW5lLk5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgeyBsZXJwIH0gZnJvbSBcIi4vVG9vbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUkdCQSB7XHJcbiAgICBzdGF0aWMgZGVidWcgPSBuZXcgUkdCQSgxLCAwLCAxLCAxKTtcclxuICAgIHN0YXRpYyBnb2xkZW4gPSBuZXcgUkdCQSgxLCAyMTUgLyAyNTUsIDAsIDEpO1xyXG4gICAgc3RhdGljIHllbGxvdyA9IG5ldyBSR0JBKDEsIDEsIDAsIDEpO1xyXG4gICAgc3RhdGljIHBpbmsgPSBuZXcgUkdCQSgxLCAxOTIgLyAyNTUsIDIwMyAvIDI1NSwgMSk7XHJcbiAgICBzdGF0aWMgYmxhY2sgPSBuZXcgUkdCQSgwLCAwLCAwLCAxKTtcclxuICAgIHN0YXRpYyByZWQgPSBuZXcgUkdCQSgxLCAwLCAwLCAxKTtcclxuXHJcbiAgICByOiBudW1iZXI7XHJcbiAgICBnOiBudW1iZXI7XHJcbiAgICBiOiBudW1iZXI7XHJcbiAgICBhOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnIgPSByO1xyXG4gICAgICAgIHRoaXMuZyA9IGc7XHJcbiAgICAgICAgdGhpcy5iID0gYjtcclxuICAgICAgICB0aGlzLmEgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsZXJwKEE6IFJHQkEsIEI6IFJHQkEsIGs6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUkdCQShcclxuICAgICAgICAgICAgbGVycChBLnIsIEIuciwgayksXHJcbiAgICAgICAgICAgIGxlcnAoQS5nLCBCLmcsIGspLFxyXG4gICAgICAgICAgICBsZXJwKEEuYiwgQi5iLCBrKSxcclxuICAgICAgICAgICAgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKEE6IFJHQkEpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJHQkEodGhpcy5yICsgQS5yLCB0aGlzLmcgKyBBLmcsIHRoaXMuYiArIEEuYiwgMSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG11bHRpcGx5KHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUkdCQSh0aGlzLnIgKiBzLCB0aGlzLmcgKiBzLCB0aGlzLmIgKiBzLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gXCIoIFwiICsgdGhpcy5yICsgXCIgLCBcIiArIHRoaXMuZyArIFwiICwgXCIgKyB0aGlzLmIgKyBcIiApXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVHJhbnNmb3JtIGZyb20gJy4vVHJhbnNmb3JtJztcclxuaW1wb3J0IFRyaWFuZ2xlIGZyb20gJy4vVHJpYW5nbGUnO1xyXG5pbXBvcnQgeyBDbGlwUGxhbmUsIGNsaXAgfSBmcm9tICcuL1Rvb2wnO1xyXG5pbXBvcnQgVmVydGV4IGZyb20gJy4vVmVydGV4JztcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQnVmZmVyMkQgZnJvbSBcIi4vQnVmZmVyMkRcIjtcclxuaW1wb3J0IFJHQkEgZnJvbSBcIi4vUkdCQVwiO1xyXG5pbXBvcnQgUmVuZGVyVGFyZ2V0IGZyb20gJy4vUmVuZGVyVGFyZ2V0JztcclxuaW1wb3J0IFRleHR1cmUyRCBmcm9tICcuL1RleHR1cmUyRCc7XHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuL1ZlY3RvcjJEJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhc3Rlcml6ZXIge1xyXG4gICAgc3RhdGljIGNvbG9yX2J1ZmZlcjogQnVmZmVyMkQ8UkdCQT47XHJcbiAgICBzdGF0aWMgel9idWZmZXI6IEJ1ZmZlcjJEPG51bWJlcj47XHJcblxyXG4gICAgc3RhdGljIGNsZWFyKGNvbG9yOiBSR0JBLCB6OiBudW1iZXIpIHtcclxuICAgICAgICBSYXN0ZXJpemVyLmNvbG9yX2J1ZmZlci5jbGVhcihjb2xvcik7XHJcbiAgICAgICAgUmFzdGVyaXplci56X2J1ZmZlci5jbGVhcih6KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2hvdyhyZW5kZXJfdGFyZ2V0OiBSZW5kZXJUYXJnZXQpIHtcclxuICAgICAgICByZW5kZXJfdGFyZ2V0LnNldF9waXhlbCgoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFJhc3Rlcml6ZXIuY29sb3JfYnVmZmVyLmdldCh4LCB5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZW5kZXJfdGFyZ2V0LnNob3dfYnVmZmVyKCdjYW52YXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xpcF9oZWxwZXIoaW5fbGlzdDogVHJpYW5nbGVbXSxcclxuICAgICAgICB2MF9vdXQ6ICh0cmlhbmdsZTogVHJpYW5nbGUpID0+IGJvb2xlYW4sXHJcbiAgICAgICAgdjFfb3V0OiAodHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiBib29sZWFuLFxyXG4gICAgICAgIHYyX291dDogKHRyaWFuZ2xlOiBUcmlhbmdsZSkgPT4gYm9vbGVhbixcclxuICAgICAgICBwbGFuZTogQ2xpcFBsYW5lKSB7XHJcblxyXG4gICAgICAgIGxldCBvdXRfbGlzdDogVHJpYW5nbGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFQgb2YgaW5fbGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gY2xpcChULCB2MF9vdXQsIHYxX291dCwgdjJfb3V0LCBwbGFuZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgb3V0X2xpc3QucHVzaCh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dF9saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGlwX2luX1Byb2plY3Rpb25fU3BhY2UodjA6IFZlcnRleCwgdjE6IFZlcnRleCwgdjI6IFZlcnRleCwgcGNhbWVyYTogQ2FtZXJhKSB7XHJcbiAgICAgICAgLy8gVG9kbzrln7fooYw25YCL5bmz6Z2i55qE5LiJ6KeS5b2i6KOB5YiHXHJcbiAgICAgICAgLy8g5ZKMeei7uOWkvjQ15bqm55qEMuWAi+W5s+mdouOAgeWSjHjou7jlpL40NeW6pueahDLlgIvlubPpnaLjgIHpgoTmnIlOY+WSjEZjXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjguaHRtbFxyXG5cclxuICAgICAgICBsZXQgaW5fbGlzdCA9IFtuZXcgVHJpYW5nbGUodjAsIHYxLCB2MildO1xyXG5cclxuICAgICAgICAvLyBGYXJcclxuICAgICAgICBsZXQgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKGluX2xpc3QsXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gVC52MC53IDwgVC52MC5wLno7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gVC52MS53IDwgVC52MS5wLno7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gVC52Mi53IDwgVC52Mi5wLno7IH0sXHJcbiAgICAgICAgICAgIENsaXBQbGFuZS5GYXIpO1xyXG5cclxuICAgICAgICAvLyBOZWFyXHJcbiAgICAgICAgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKG91dF9saXN0LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIDAgPiBULnYwLnAuejsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiAwID4gVC52MS5wLno7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gMCA+IFQudjIucC56OyB9LFxyXG4gICAgICAgICAgICBDbGlwUGxhbmUuTmVhcik7XHJcblxyXG4gICAgICAgIC8vIOS4jeWwjVJpZ2h0IOOAgUxlZnTjgIFUb3DjgIFCb3R0b23kvZzoo4HliIfkuoZcclxuICAgICAgICAvLyDlj43mraPlnKhzY3JlZW4gc3BhY2XlhYnmn7XljJbkuInop5LlvaLmmYLkuZ/mnIPnlKjpgornlYzoo4HliIdcclxuICAgICAgICByZXR1cm4gb3V0X2xpc3Q7XHJcblxyXG4gICAgICAgIC8vIFJpZ2h0XHJcbiAgICAgICAgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKG91dF9saXN0LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIFQudjAudyA8IFQudjAucC54OyB9LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIFQudjEudyA8IFQudjEucC54OyB9LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIFQudjIudyA8IFQudjIucC54OyB9LFxyXG4gICAgICAgICAgICBDbGlwUGxhbmUuUmlnaHQpO1xyXG5cclxuICAgICAgICAvLyBMZWZ0XHJcbiAgICAgICAgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKG91dF9saXN0LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIC1ULnYwLncgPiBULnYwLnAueDsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiAtVC52MS53ID4gVC52MS5wLng7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gLVQudjIudyA+IFQudjIucC54OyB9LFxyXG4gICAgICAgICAgICBDbGlwUGxhbmUuTGVmdCk7XHJcblxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIG91dF9saXN0ID0gUmFzdGVyaXplci5jbGlwX2hlbHBlcihvdXRfbGlzdCxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiBULnYwLncgPCBULnYwLnAueTsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiBULnYxLncgPCBULnYxLnAueTsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiBULnYyLncgPCBULnYyLnAueTsgfSxcclxuICAgICAgICAgICAgQ2xpcFBsYW5lLlRvcCk7XHJcblxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIG91dF9saXN0ID0gUmFzdGVyaXplci5jbGlwX2hlbHBlcihvdXRfbGlzdCxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiAtVC52MC53ID4gVC52MC5wLnk7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gLVQudjEudyA+IFQudjEucC55OyB9LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIC1ULnYyLncgPiBULnYyLnAueTsgfSxcclxuICAgICAgICAgICAgQ2xpcFBsYW5lLkJvdHRvbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTVZQX2JhY2tmYWNlX2N1bGxpbmdfY2xpcHBpbmcodHJpYW5nbGU6IFRyaWFuZ2xlLCBwY2FtZXJhOiBDYW1lcmEsIHdvcmxkVHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcclxuICAgICAgICAvLyB0byB3b3JsZCBzcGFjZVxyXG4gICAgICAgIGxldCB2MF93ID0gVHJhbnNmb3JtLnRyYW5zZm9ybVBvaW50KHdvcmxkVHJhbnNmb3JtLCB0cmlhbmdsZS52MC5wKTtcclxuICAgICAgICBsZXQgdjFfdyA9IFRyYW5zZm9ybS50cmFuc2Zvcm1Qb2ludCh3b3JsZFRyYW5zZm9ybSwgdHJpYW5nbGUudjEucCk7XHJcbiAgICAgICAgbGV0IHYyX3cgPSBUcmFuc2Zvcm0udHJhbnNmb3JtUG9pbnQod29ybGRUcmFuc2Zvcm0sIHRyaWFuZ2xlLnYyLnApO1xyXG5cclxuICAgICAgICAvLyB0byBjYW1lcmEgc3BhY2VcclxuICAgICAgICBsZXQgdjBfYyA9IHBjYW1lcmEudG9DYW1lcmFTcGFjZSh2MF93KTtcclxuICAgICAgICBsZXQgdjFfYyA9IHBjYW1lcmEudG9DYW1lcmFTcGFjZSh2MV93KTtcclxuICAgICAgICBsZXQgdjJfYyA9IHBjYW1lcmEudG9DYW1lcmFTcGFjZSh2Ml93KTtcclxuXHJcbiAgICAgICAgLy8gdG8gcHJvamVjdGlvbiBzcGFjZSAoY2xpcCBzcGFjZSlcclxuICAgICAgICBsZXQgdjBfcCA9IHBjYW1lcmEudG9Qcm9qZWN0aW9uU3BhY2UodjBfYyk7XHJcbiAgICAgICAgbGV0IHYxX3AgPSBwY2FtZXJhLnRvUHJvamVjdGlvblNwYWNlKHYxX2MpO1xyXG4gICAgICAgIGxldCB2Ml9wID0gcGNhbWVyYS50b1Byb2plY3Rpb25TcGFjZSh2Ml9jKTtcclxuXHJcbiAgICAgICAgLy8gYmFjayBmYWNlIGN1bGxpbmcgXHJcbiAgICAgICAgLy8gbGV0IHYwX3Rlc3QgPSBuZXcgVmVjdG9yKHYwX3AueCwgdjBfcC55LCB2MF9jLnopO1xyXG4gICAgICAgIC8vIGxldCB2MV90ZXN0ID0gbmV3IFZlY3Rvcih2MV9wLngsIHYxX3AueSwgdjFfYy56KTtcclxuICAgICAgICAvLyBsZXQgdjJfdGVzdCA9IG5ldyBWZWN0b3IodjJfcC54LCB2Ml9wLnksIHYyX2Mueik7XHJcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IFZlY3Rvci5jYWxjdWxhdGVfbm9ybWFsKHYwX3Rlc3QsIHYxX3Rlc3QsIHYyX3Rlc3QpO1xyXG4gICAgICAgIC8vIGxldCBjZW50ZXJfdG9fZXllID0gVmVjdG9yLm1pbnVzKFZlY3Rvci56ZXJvLCBWZWN0b3IuY2FsY3VsYXRlX2NlbnRlcih2MF90ZXN0LCB2MV90ZXN0LCB2Ml90ZXN0KSkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgIC8vIOWcqHZpZXcgc3BhY2XlgZrvvIzkuI3nhLblnKhjbGlwIHNwYWNl5YGa77yM6YKE6KaB5oqKeueUqHflj5bku6PmjonvvIzmnInpu57mkJ7lt6VcclxuICAgICAgICBsZXQgbm9ybWFsID0gVmVjdG9yLmNhbGN1bGF0ZV9ub3JtYWwodjBfYywgdjFfYywgdjJfYyk7XHJcbiAgICAgICAgbGV0IGNlbnRlcl90b19leWUgPSBWZWN0b3IubWludXMoVmVjdG9yLnplcm8sIFZlY3Rvci5jYWxjdWxhdGVfY2VudGVyKHYwX2MsIHYxX2MsIHYyX2MpKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgY29zX3ZhbHVlID0gVmVjdG9yLmRvdChub3JtYWwsIGNlbnRlcl90b19leWUpOztcclxuICAgICAgICBpZiAoY29zX3ZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1bGxpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDph43mlrDntoHlrpp1dlxyXG4gICAgICAgIGxldCB2MCA9IHRyaWFuZ2xlLnYwLmNsb25lKCkudXBkYXRlX3AodjBfcCkudXBkYXRlX3codjBfYy56KTtcclxuICAgICAgICBsZXQgdjEgPSB0cmlhbmdsZS52MS5jbG9uZSgpLnVwZGF0ZV9wKHYxX3ApLnVwZGF0ZV93KHYxX2Mueik7XHJcbiAgICAgICAgbGV0IHYyID0gdHJpYW5nbGUudjIuY2xvbmUoKS51cGRhdGVfcCh2Ml9wKS51cGRhdGVfdyh2Ml9jLnopO1xyXG5cclxuICAgICAgICAvLyDln7fooYzkuInop5LlvaLoo4HliIdcclxuICAgICAgICByZXR1cm4gUmFzdGVyaXplci5jbGlwX2luX1Byb2plY3Rpb25fU3BhY2UodjAsIHYxLCB2MiwgcGNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVzZV9zb2xpZF9jb2xvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc3RhdGljIG5kY19jbGFtcF9lZmZlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXRpYyBwZWVrX3NjcmVlbl9wb3M6IFZlY3RvcjJEO1xyXG5cclxuICAgIHN0YXRpYyBzZXRfcGVla19zY3JlZW5fcG9zKHBlZWtfc2NyZWVuX3BvczogVmVjdG9yMkQpIHtcclxuICAgICAgICBSYXN0ZXJpemVyLnBlZWtfc2NyZWVuX3BvcyA9IHBlZWtfc2NyZWVuX3BvcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcHJpbnRfb25jZSA9IGZhbHNlO1xyXG4gICAgc3RhdGljIHByaW50X3BlZWtfcG9zaXRpb24oKSB7XHJcbiAgICAgICAgUmFzdGVyaXplci5wcmludF9vbmNlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZygncHJpbnRfcGVla19wb3NpdGlvbicpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHByb2Nlc3ModHJpYW5nbGU6IFRyaWFuZ2xlLCBwY2FtZXJhOiBDYW1lcmEsIHdvcmxkVHJhbnNmb3JtOiBUcmFuc2Zvcm0sIHRleHR1cmU6IFRleHR1cmUyRCkge1xyXG5cclxuICAgICAgICAvLyB0byBNVlBcclxuICAgICAgICBsZXQgdHJpYW5nbGVfbGlzdCA9IFJhc3Rlcml6ZXIuTVZQX2JhY2tmYWNlX2N1bGxpbmdfY2xpcHBpbmcodHJpYW5nbGUsIHBjYW1lcmEsIHdvcmxkVHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIC8vIHRvIE5EQ1xyXG4gICAgICAgIGZvciAobGV0IFQgb2YgdHJpYW5nbGVfbGlzdCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG4wID0gcGNhbWVyYS50b05EQyhULnYwLnAsIFQudjAudyk7XHJcbiAgICAgICAgICAgIGxldCBuMSA9IHBjYW1lcmEudG9OREMoVC52MS5wLCBULnYxLncpO1xyXG4gICAgICAgICAgICBsZXQgbjIgPSBwY2FtZXJhLnRvTkRDKFQudjIucCwgVC52Mi53KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5EQ+aHieipsuimgeiQveWcqFxyXG4gICAgICAgICAgICAvLyAtMSDiiaQgeCDiiaQgMSwgLTEg4omkIHkg4omkIDFcclxuXHJcbiAgICAgICAgICAgIC8vIOS4jeijgeWIh2xlZnTjgIFyaWdodOOAgXRvcOOAgWJvdHRvbe+8jOeEtuW+jGNsYW1wIG5kY+S5n+eul+aYr+S4gOeorueJueauiuaViOaenFxyXG4gICAgICAgICAgICBpZiAoUmFzdGVyaXplci5uZGNfY2xhbXBfZWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBuMC5jbGFtcF94KC0xLCAxKS5jbGFtcF95KC0xLCAxKTtcclxuICAgICAgICAgICAgICAgIG4xLmNsYW1wX3goLTEsIDEpLmNsYW1wX3koLTEsIDEpO1xyXG4gICAgICAgICAgICAgICAgbjIuY2xhbXBfeCgtMSwgMSkuY2xhbXBfeSgtMSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRvIHNjcmVlbiBzcGFjZVxyXG4gICAgICAgICAgICAvLyAwIOKJpCB4IOKJpCB3LCAwIOKJpCB5IOKJpCBoXHJcbiAgICAgICAgICAgIGxldCBzMCA9IHBjYW1lcmEudG9TY3JlZW5TcGFjZShuMCk7XHJcbiAgICAgICAgICAgIGxldCBzMSA9IHBjYW1lcmEudG9TY3JlZW5TcGFjZShuMSk7XHJcbiAgICAgICAgICAgIGxldCBzMiA9IHBjYW1lcmEudG9TY3JlZW5TcGFjZShuMik7XHJcblxyXG4gICAgICAgICAgICAvLyDngrrkuoblkozmnKzkvobnmoRjb2Rl55u45a6577yM5pqr5pmC5YWI5YKz5Ye65Y67XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzMCk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzMSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzMik7XHJcblxyXG4gICAgICAgICAgICAvLyDmib7lh7rljIXlnI3nmoTnn6nlvaJcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjguaHRtbFxyXG4gICAgICAgICAgICAvLyDlnJYgU2NyZWVuIFNwYWNlXHJcbiAgICAgICAgICAgIGxldCB7IG1pbiwgbWF4IH0gPSBWZWN0b3IubWluX21heChzMCwgczEsIHMyKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWluLngsIG1heC54LCAnfCcsIG1pbi55LCBtYXgueSk7XHJcbiAgICAgICAgICAgIGxldCBtaW5feCA9IE1hdGguZmxvb3IobWluLngpO1xyXG4gICAgICAgICAgICBsZXQgbWF4X3ggPSBNYXRoLmZsb29yKG1heC54KTtcclxuICAgICAgICAgICAgbGV0IG1pbl95ID0gTWF0aC5mbG9vcihtaW4ueSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhfeSA9IE1hdGguZmxvb3IobWF4LnkpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2xhbXAgYnkgc2NyZWVuIHNpemVcclxuICAgICAgICAgICAgbWluX3ggPSBNYXRoLm1heCgwLCBtaW5feCk7XHJcbiAgICAgICAgICAgIG1pbl95ID0gTWF0aC5tYXgoMCwgbWluX3kpO1xyXG4gICAgICAgICAgICBtYXhfeCA9IE1hdGgubWluKHRoaXMuY29sb3JfYnVmZmVyLncgLSAxLCBtYXhfeCk7XHJcbiAgICAgICAgICAgIG1heF95ID0gTWF0aC5taW4odGhpcy5jb2xvcl9idWZmZXIuaCAtIDEsIG1heF95KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhbGwgPSAobWF4X3ggLSBtaW5feCkgKiAobWF4X3kgLSBtaW5feSk7XHJcbiAgICAgICAgICAgIGxldCBkcmF3ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBoYWxmX3dfcGl4ZWwgPSAwLjUgLyBSYXN0ZXJpemVyLmNvbG9yX2J1ZmZlci53O1xyXG4gICAgICAgICAgICBsZXQgaGFsZl9oX3BpeGVsID0gMC41IC8gUmFzdGVyaXplci5jb2xvcl9idWZmZXIuaDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFsZl93X3BpeGVsLCBoYWxmX2hfcGl4ZWwpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbWluX3g7IHggPD0gbWF4X3g7ICsreCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IG1pbl95OyB5IDw9IG1heF95OyArK3kpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjguaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWcliBTY3JlZW4gU3BhY2VcclxuICAgICAgICAgICAgICAgICAgICBsZXQgUCA9IG5ldyBWZWN0b3IoeCArIDAuNSwgeSArIDAuNSwgMClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCN55+p5b2i6KOh55qE5q+P5YCL6bueUFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIpOWumuaYr+WQpuS9jeWcqHNjcmVlbiBzcGFjZeS4ieinkuW9ouijoemdolxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB7IHN1Y2Nlc3MsIM6xLCDOsiwgzrMgfSA9IFRyaWFuZ2xlLmNhbGN1bGF0ZV/OsV/Osl/OsyhzMCwgczEsIHMyLCBQKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSYXN0ZXJpemVyLnByaW50X29uY2UgJiYgeCA9PSBSYXN0ZXJpemVyLnBlZWtfc2NyZWVuX3Bvcy54ICYmIHkgPT0gUmFzdGVyaXplci5wZWVrX3NjcmVlbl9wb3MueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXNfaW5fdHJpYW5nbGUnLCBUcmlhbmdsZS5pc19pbl90cmlhbmdsZSjOsSwgzrIsIM6zKSwgzrEsIM6yLCDOsyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVRyaWFuZ2xlLmlzX2luX3RyaWFuZ2xlKM6xLCDOsiwgzrMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgeWVzIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICgxKeioiOeul3rlgLwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5b6eTkRD5YiwU2NyZWVuIFNwYWNl5piv5Lu/5bCE6K6K5o+b77yM5YWn5o+S5qyK6YeNzrHjgIHOsuOAgc6z5LiA5qijXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAxOS8xMS9ibG9nLXBvc3RfMzAuaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB6ID0gVHJpYW5nbGUuaW50ZXJwb2xhdGlvbijOsywgzrEsIM6yLCBuMC56LCBuMS56LCBuMi56KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8geiB0ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZlcl96ID0gUmFzdGVyaXplci56X2J1ZmZlci5nZXQoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHogPiBidWZmZXJfeilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWvq+WFpXrlgLxcclxuICAgICAgICAgICAgICAgICAgICBSYXN0ZXJpemVyLnpfYnVmZmVyLnNldCh4LCB5LCB6KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKDIp5ZyoTkRD6YCy6KGM5YWn5o+S77yM5LmY5LiKd+WbnuWIsHByb2plY3Rpb24gc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dwbm5vdGVzLmJsb2dzcG90LmNvbS8yMDIxLzExL2Jsb2ctcG9zdF8yNy5odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHcgPSAxIC8gVHJpYW5nbGUuaW50ZXJwb2xhdGlvbijOsywgzrEsIM6yLCAxIC8gVC52MC53LCAxIC8gVC52MS53LCAxIC8gVC52Mi53KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KaB5ZyoTkRD5o+S5YC877yM5omA5Lul6Zmk5Luld1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1X25kYyA9IFRyaWFuZ2xlLmludGVycG9sYXRpb24ozrMsIM6xLCDOsiwgVC52MC51IC8gVC52MC53LCBULnYxLnUgLyBULnYxLncsIFQudjIudSAvIFQudjIudyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZfbmRjID0gVHJpYW5nbGUuaW50ZXJwb2xhdGlvbijOsywgzrEsIM6yLCBULnYwLnYgLyBULnYwLncsIFQudjEudiAvIFQudjEudywgVC52Mi52IC8gVC52Mi53KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvamVjdGlvbiBzcGFjZSBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdSA9IHVfbmRjICogdztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHZfbmRjICogdztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgY29sb3IgfSA9IHRleHR1cmUuZ2V0KG5ldyBWZWN0b3IyRCh1LCB2KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJhc3Rlcml6ZXIudXNlX3NvbGlkX2NvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSYXN0ZXJpemVyLmNvbG9yX2J1ZmZlci5zZXQoeCwgeSwgUkdCQS55ZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFzdGVyaXplci5jb2xvcl9idWZmZXIuc2V0KHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSYXN0ZXJpemVyLnByaW50X29uY2UgJiYgeCA9PSBSYXN0ZXJpemVyLnBlZWtfc2NyZWVuX3Bvcy54ICYmIHkgPT0gUmFzdGVyaXplci5wZWVrX3NjcmVlbl9wb3MueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Zyo5LiJ6KeS5b2i5YWnJywgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb3VudCwgTWF0aC5mbG9vcigxMDAgKiBkcmF3IC8gYWxsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChSYXN0ZXJpemVyLnByaW50X29uY2UpIHtcclxuICAgICAgICAgICAgUmFzdGVyaXplci5wcmludF9vbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2ggcGVlaycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjb3IgZnJvbSBcIi4vVmVjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXkge1xyXG4gICAgZnJvbTogVmVjb3I7XHJcbiAgICBkaXI6IFZlY29yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZyb206IFZlY29yLCBkaXI6IFZlY29yKSB7XHJcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgICAgICB0aGlzLmRpciA9IGRpcjtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgVmVjb3I0RCBmcm9tIFwiLi9WZWN0b3I0RFwiO1xyXG5cclxuLy8g5ZyoM0Qgc3BhY2Xoo4HliIfnmoToqbFcclxuLy8g6YKE6KaB6ICD5oWu5LuA6bq85pmC5YCZ6KaB55SoKHgseSx3KeijgeWIh1xyXG4vLyDku4DpurzmmYLlgJnopoHnlKgoeCx5LHop6KOB5YiHXHJcbi8vIFxyXG4vLyDkuI3lpoLnm7TmjqXlnKg0RCBzcGFjZeijgeWIh1xyXG4vLyBodHRwczovL2dwbm5vdGVzLmJsb2dzcG90LmNvbS8yMDIxLzExL2Jsb2ctcG9zdF8yOC5odG1sXHJcbi8vIOWcliA0RCBzcGFjZSBjbGlwXHJcbi8vIOmAmeijoeeUqERpcmVjdHjnmoRORENcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF5NEQge1xyXG4gICAgZnJvbTogVmVjb3I0RDtcclxuICAgIGRpcjogVmVjb3I0RDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmcm9tOiBWZWNvcjRELCB0bzogVmVjb3I0RCkge1xyXG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XHJcbiAgICAgICAgdGhpcy5kaXIgPSBuZXcgVmVjb3I0RChWZWN0b3IubWludXModG8ucCwgZnJvbS5wKSwgdG8udyAtIGZyb20udyk7XHJcbiAgICB9XHJcblxyXG4gICAgdF93aGVuX3hfZXF1YWxfdygpIHtcclxuICAgICAgICAvLyBmcm9tLnggKyB0ICogZGlyLng9IGZyb20udyArIHQgKiBkaXIudztcclxuICAgICAgICBsZXQgdCA9ICh0aGlzLmZyb20udyAtIHRoaXMuZnJvbS5wLngpIC8gKHRoaXMuZGlyLnAueCAtIHRoaXMuZGlyLncpO1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG5cclxuICAgIHRfd2hlbl95X2VxdWFsX3coKSB7XHJcbiAgICAgICAgbGV0IHQgPSAodGhpcy5mcm9tLncgLSB0aGlzLmZyb20ucC55KSAvICh0aGlzLmRpci5wLnkgLSB0aGlzLmRpci53KTtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuXHJcbiAgICB0X3doZW5fel9lcXVhbF93KCkge1xyXG4gICAgICAgIGxldCB0ID0gKHRoaXMuZnJvbS53IC0gdGhpcy5mcm9tLnAueikgLyAodGhpcy5kaXIucC56IC0gdGhpcy5kaXIudyk7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdF93aGVuX3hfZXF1YWxfbWludXNfdygpIHtcclxuICAgICAgICAvLyBmcm9tLnggKyB0ICogZGlyLng9IC0oZnJvbS53ICsgdCAqIGRpci53KTtcclxuXHJcbiAgICAgICAgbGV0IHQgPSAtKHRoaXMuZnJvbS53ICsgdGhpcy5mcm9tLnAueCkgLyAodGhpcy5kaXIudyArIHRoaXMuZGlyLnAueCk7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdF93aGVuX3lfZXF1YWxfbWludXNfdygpIHtcclxuICAgICAgICBsZXQgdCA9IC0odGhpcy5mcm9tLncgKyB0aGlzLmZyb20ucC55KSAvICh0aGlzLmRpci53ICsgdGhpcy5kaXIucC55KTtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuXHJcbiAgICB0X3doZW5fel9lcXVhbF96ZXJvX3coKSB7XHJcblxyXG4gICAgICAgIC8vIGZyb20ueiArIHQgKiBkaXIuej0gMDtcclxuICAgICAgICBsZXQgdCA9IC10aGlzLmZyb20ucC56IC8gdGhpcy5kaXIucC56O1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBCdWZmZXIyRCBmcm9tIFwiLi9CdWZmZXIyRFwiO1xyXG5pbXBvcnQgUkdCQSBmcm9tIFwiLi9SR0JBXCI7XHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2FtcGxlciB7XHJcblxyXG4gICAgc3RhdGljIHV2X3RvX2J1ZmZlcl9zcGFjZSh1djogVmVjdG9yMkQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHV2LngsIDEgLSB1di55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYnVmZmVyX3RvX3V2X3NwYWNlKHV2OiBWZWN0b3IyRCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodXYueCwgMSAtIHV2LnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0ZXh0dXJlMkQodXY6IFZlY3RvcjJELCBidWZmZXI6IEJ1ZmZlcjJEPFJHQkE+KSB7XHJcblxyXG4gICAgICAgIGxldCB3ID0gYnVmZmVyLnc7XHJcbiAgICAgICAgbGV0IGggPSBidWZmZXIuaDtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlcl91diA9IFNhbXBsZXIudXZfdG9fYnVmZmVyX3NwYWNlKHV2KTtcclxuICAgICAgICBsZXQgdSA9IGJ1ZmZlcl91di54O1xyXG4gICAgICAgIGxldCB2ID0gYnVmZmVyX3V2Lnk7XHJcblxyXG4gICAgICAgIC8v5YWI5om+5Ye65pyA6L+R6bueXHJcbiAgICAgICAgbGV0IGdyaWRfdSA9IDEgLyB3O1xyXG4gICAgICAgIGxldCBncmlkX3YgPSAxIC8gaDtcclxuXHJcbiAgICAgICAgbGV0IGhhbGZfZ3JpZF91ID0gZ3JpZF91ICogMC41O1xyXG4gICAgICAgIGxldCBoYWxmX2dyaWRfdiA9IGdyaWRfdiAqIDAuNTtcclxuXHJcbiAgICAgICAgLy/ku6XkuIvmmK/mnIk05YCL6YSw6bue55qE5oOF5rOBLi5cclxuICAgICAgICBsZXQgbmVhcmVzdF9wb2ludF91X2Zsb2F0ID0gdSAvIGdyaWRfdTtcclxuICAgICAgICBsZXQgbmVhcmVzdF9wb2ludF92X2Zsb2F0ID0gdiAvIGdyaWRfdjtcclxuXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfcG9pbnRfdSA9IE1hdGguZmxvb3IobmVhcmVzdF9wb2ludF91X2Zsb2F0KTtcclxuICAgICAgICBsZXQgbmVhcmVzdF9wb2ludF92ID0gTWF0aC5mbG9vcihuZWFyZXN0X3BvaW50X3ZfZmxvYXQpO1xyXG5cclxuICAgICAgICAvL2FsZXJ0KG5lYXJlc3RfcG9pbnRfdStcIixcIituZWFyZXN0X3BvaW50X3YpO1xyXG5cclxuICAgICAgICAvL+WcqOOAjOacgOi/kem7nuOAjeagvOijoeeahGxvY2FsIHV2XHJcbiAgICAgICAgbGV0IHNfdSA9IHUgJSBncmlkX3U7XHJcbiAgICAgICAgbGV0IHNfdiA9IHYgJSBncmlkX3Y7XHJcblxyXG4gICAgICAgIC8v5YaN5om+5Ye655u46YSwM+m7nlxyXG4gICAgICAgIGlmIChzX3UgPj0gaGFsZl9ncmlkX3UgJiYgc192ID49IGhhbGZfZ3JpZF92KS8v55u46YSwM+m7nuWcqOWPs+S4i1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/liZvlpb3mlbTpmaTmmYLopoHlgZrkv67mraNcclxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfcG9pbnRfdV9mbG9hdCA9PSBuZWFyZXN0X3BvaW50X3UpXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3BvaW50X3UgPSBuZWFyZXN0X3BvaW50X3UgLSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfcG9pbnRfdl9mbG9hdCA9PSBuZWFyZXN0X3BvaW50X3YpXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3BvaW50X3YgPSBuZWFyZXN0X3BvaW50X3YgLSAxO1xyXG4gICAgICAgICAgICBsZXQgUCA9IG5ldyBWZWN0b3IyRChuZWFyZXN0X3BvaW50X3UsIG5lYXJlc3RfcG9pbnRfdik7XHJcblxyXG4gICAgICAgICAgICAvLyDlj7PkuItcclxuICAgICAgICAgICAgbGV0IE5FID0gbmV3IFZlY3RvcjJEKFAueCArIDEsIFAueSk7XHJcbiAgICAgICAgICAgIGxldCBTVyA9IG5ldyBWZWN0b3IyRChQLngsIFAueSArIDEpO1xyXG4gICAgICAgICAgICBsZXQgU0UgPSBuZXcgVmVjdG9yMkQoUC54ICsgMSwgUC55ICsgMSk7XHJcbiAgICAgICAgICAgIC8v5ZyoNOm7nuWFp+eahHV2XHJcbiAgICAgICAgICAgIGxldCByZWN0VVYgPSBuZXcgVmVjdG9yMkQoKHNfdSAtIGhhbGZfZ3JpZF91KSAvIGdyaWRfdSwgKHNfdiAtIGhhbGZfZ3JpZF92KSAvIGdyaWRfdik7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHJlY3RVViwgTlc6IFAsIE5FLCBTVywgU0UsIGNvbG9yOiBTYW1wbGVyLkJpbGluZWFyX1NhbXBsZXIocmVjdFVWLCBQLCBORSwgU1csIFNFLCBidWZmZXIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNfdSA8PSBoYWxmX2dyaWRfdSAmJiBzX3YgPj0gaGFsZl9ncmlkX3YpLy/nm7jphLAz6bue5Zyo5bem5LiLXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WJm+WlveaVtOmZpOaZguimgeWBmuS/ruato1xyXG4gICAgICAgICAgICBpZiAobmVhcmVzdF9wb2ludF92X2Zsb2F0ID09IG5lYXJlc3RfcG9pbnRfdilcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfcG9pbnRfdiA9IG5lYXJlc3RfcG9pbnRfdiAtIDE7XHJcbiAgICAgICAgICAgIGxldCBQID0gbmV3IFZlY3RvcjJEKG5lYXJlc3RfcG9pbnRfdSwgbmVhcmVzdF9wb2ludF92KTtcclxuXHJcbiAgICAgICAgICAgIC8vIOW3puS4i1xyXG4gICAgICAgICAgICBsZXQgTlcgPSBuZXcgVmVjdG9yMkQoUC54IC0gMSwgUC55KTtcclxuICAgICAgICAgICAgbGV0IFNXID0gbmV3IFZlY3RvcjJEKFAueCAtIDEsIFAueSArIDEpO1xyXG4gICAgICAgICAgICBsZXQgU0UgPSBuZXcgVmVjdG9yMkQoUC54LCBQLnkgKyAxKTtcclxuICAgICAgICAgICAgLy/lnKg06bue5YWn55qEdXZcclxuICAgICAgICAgICAgbGV0IHJlY3RVViA9IG5ldyBWZWN0b3IyRCgoc191ICsgaGFsZl9ncmlkX3UpIC8gZ3JpZF91LCAoc192IC0gaGFsZl9ncmlkX3YpIC8gZ3JpZF92KTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcmVjdFVWLCBOVywgTkU6IFAsIFNXLCBTRSwgY29sb3I6IFNhbXBsZXIuQmlsaW5lYXJfU2FtcGxlcihyZWN0VVYsIE5XLCBQLCBTVywgU0UsIGJ1ZmZlcikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc191IDw9IGhhbGZfZ3JpZF91ICYmIHNfdiA8PSBoYWxmX2dyaWRfdikvL+ebuOmEsDPpu57lnKjlt6bkuIpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBQID0gbmV3IFZlY3RvcjJEKG5lYXJlc3RfcG9pbnRfdSwgbmVhcmVzdF9wb2ludF92KTtcclxuXHJcbiAgICAgICAgICAgIC8vIOW3puS4ilxyXG4gICAgICAgICAgICBsZXQgTlcgPSBuZXcgVmVjdG9yMkQoUC54IC0gMSwgUC55IC0gMSk7XHJcbiAgICAgICAgICAgIGxldCBORSA9IG5ldyBWZWN0b3IyRChQLngsIFAueSAtIDEpO1xyXG4gICAgICAgICAgICBsZXQgU1cgPSBuZXcgVmVjdG9yMkQoUC54IC0gMSwgUC55KTtcclxuICAgICAgICAgICAgLy/lnKg06bue5YWn55qEdXZcclxuICAgICAgICAgICAgbGV0IHJlY3RVViA9IG5ldyBWZWN0b3IyRCgoc191ICsgaGFsZl9ncmlkX3UpIC8gZ3JpZF91LCAoc192ICsgaGFsZl9ncmlkX3YpIC8gZ3JpZF92KTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcmVjdFVWLCBOVywgTkUsIFNXLCBTRTogUCwgY29sb3I6IFNhbXBsZXIuQmlsaW5lYXJfU2FtcGxlcihyZWN0VVYsIE5XLCBORSwgU1csIFAsIGJ1ZmZlcikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWxzZSBpZiAoc191ID49IGhhbGZfZ3JpZF91ICYmIHNfdiA8PSBoYWxmX2dyaWRfdikvL+ebuOmEsDPpu57lnKjlj7PkuIpcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy/liZvlpb3mlbTpmaTmmYLopoHlgZrkv67mraNcclxuICAgICAgICAgICAgaWYgKG5lYXJlc3RfcG9pbnRfdV9mbG9hdCA9PSBuZWFyZXN0X3BvaW50X3UpXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3BvaW50X3UgPSBuZWFyZXN0X3BvaW50X3UgLSAxO1xyXG4gICAgICAgICAgICBsZXQgUCA9IG5ldyBWZWN0b3IyRChuZWFyZXN0X3BvaW50X3UsIG5lYXJlc3RfcG9pbnRfdik7XHJcblxyXG4gICAgICAgICAgICAvLyDlj7PkuIpcclxuICAgICAgICAgICAgbGV0IE5XID0gbmV3IFZlY3RvcjJEKFAueCwgUC55IC0gMSk7XHJcbiAgICAgICAgICAgIGxldCBORSA9IG5ldyBWZWN0b3IyRChQLnggKyAxLCBQLnkgLSAxKTtcclxuICAgICAgICAgICAgbGV0IFNFID0gbmV3IFZlY3RvcjJEKFAueCArIDEsIFAueSk7XHJcbiAgICAgICAgICAgIC8v5ZyoNOm7nuWFp+eahHV2XHJcbiAgICAgICAgICAgIGxldCByZWN0VVYgPSBuZXcgVmVjdG9yMkQoKHNfdSAtIGhhbGZfZ3JpZF91KSAvIGdyaWRfdSwgKHNfdiArIGhhbGZfZ3JpZF92KSAvIGdyaWRfdik7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHJlY3RVViwgTlcsIE5FLCBTVzogUCwgU0UsIGNvbG9yOiBTYW1wbGVyLkJpbGluZWFyX1NhbXBsZXIocmVjdFVWLCBOVywgTkUsIFAsIFNFLCBidWZmZXIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBCaWxpbmVhcl9TYW1wbGVyKHJlY3RVVjogVmVjdG9yMkQsIE5XOiBWZWN0b3IyRCwgTkU6IFZlY3RvcjJELCBTVzogVmVjdG9yMkQsIFNFOiBWZWN0b3IyRCwgYnVmZmVyOiBCdWZmZXIyRDxSR0JBPikge1xyXG5cclxuICAgICAgICAvL+WwjTTlgIvpu57poY/oibLkvZzlhafmj5JcclxuICAgICAgICBsZXQgTldjID0gYnVmZmVyLmdldF9jbGFtcF9tb2RlKE5XLngsIE5XLnkpO1xyXG4gICAgICAgIGxldCBORWMgPSBidWZmZXIuZ2V0X2NsYW1wX21vZGUoTkUueCwgTkUueSk7XHJcbiAgICAgICAgbGV0IFNXYyA9IGJ1ZmZlci5nZXRfY2xhbXBfbW9kZShTVy54LCBTVy55KTtcclxuICAgICAgICBsZXQgU0VjID0gYnVmZmVyLmdldF9jbGFtcF9tb2RlKFNFLngsIFNFLnkpO1xyXG5cclxuICAgICAgICBsZXQgblJHQiA9IFJHQkEubGVycChOV2MsIE5FYywgcmVjdFVWLngpO1xyXG4gICAgICAgIGxldCBzUkdCID0gUkdCQS5sZXJwKFNXYywgU0VjLCByZWN0VVYueCk7XHJcbiAgICAgICAgbGV0IG1pZGRsZVJHQiA9IFJHQkEubGVycChuUkdCLCBzUkdCLCByZWN0VVYueSk7XHJcbiAgICAgICAgcmV0dXJuIG1pZGRsZVJHQjtcclxuICAgIH1cclxufSIsImltcG9ydCBTY2VuZU5vZGUgZnJvbSBcIi4uL09iamVjdC9TY2VuZU5vZGVcIjtcclxuaW1wb3J0IFJheSBmcm9tIFwiLi9SYXlcIjtcclxuaW1wb3J0IFJheTREIGZyb20gXCIuL1JheTREXCI7XHJcbmltcG9ydCBIaXRJbmZvIGZyb20gXCIuL0hpdEluZm9cIjtcclxuaW1wb3J0IFZlY3RvciBmcm9tIFwiLi9WZWN0b3JcIjtcclxuaW1wb3J0IFRyaWFuZ2xlIGZyb20gXCIuL1RyaWFuZ2xlXCI7XHJcbmltcG9ydCBWZXJ0ZXggZnJvbSBcIi4vVmVydGV4XCI7XHJcbmltcG9ydCBQbGFuZSBmcm9tIFwiLi9QbGFuZVwiO1xyXG5pbXBvcnQgUkdCQSBmcm9tIFwiLi9SR0JBXCI7XHJcbmltcG9ydCBCdWZmZXIyRCBmcm9tIFwiLi9CdWZmZXIyRFwiO1xyXG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWdyZWVfdG9fUmFkKGQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguUEkgKiBkIC8gMTgwO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVwc2lsb246IG51bWJlciA9IDAuMDAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlcl9lcXVhbChhOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8IGVwc2lsb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh4OiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgaWYgKHggPiBtYXgpXHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIGVsc2UgaWYgKHggPCBtaW4pXHJcbiAgICAgICAgcmV0dXJuIG1pbjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4geDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldF9oaXRfc29ydF9saXN0KG9ial9saXN0OiBTY2VuZU5vZGVbXSwgcmF5OiBSYXkpIHtcclxuXHJcbiAgICBsZXQgbGlzdCA9IG9ial9saXN0Lm1hcChvYmogPT4gb2JqLmguaGl0KHJheSwgb2JqLnMpKTtcclxuICAgIGxldCBoaXRfbGlzdCA9IDxIaXRJbmZvW10+KGxpc3QuZmlsdGVyKGluZm8gPT4gaW5mbyAhPSBudWxsICYmIGluZm8ucG9zaXRpdmVfdCkpO1xyXG5cclxuICAgIHJldHVybiBoaXRfbGlzdC5zb3J0KChhOiBIaXRJbmZvLCBiOiBIaXRJbmZvKSA9PiBhLnQgLSBiLnQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3NoYWRvd193ZWlnaHQoaGl0X2luZm86IEhpdEluZm8sIGRpcmVjdGlvbl9saWdodF9kaXI6IFZlY3Rvciwgb2JqX2xpc3Q6IFNjZW5lTm9kZVtdKSB7XHJcblxyXG4gICAgLy8g5piv5ZCm5Zyo5b2x5a2Q5YWnXHJcbiAgICBsZXQgZGlyID0gZGlyZWN0aW9uX2xpZ2h0X2Rpci5uZWdhdGl2ZSgpO1xyXG4gICAgbGV0IGZyb20gPSBoaXRfaW5mby5oaXRfcG9zLmFkZChkaXIubXVsdGlwbHkoZXBzaWxvbikpOyAvLyDlgY/np7vkuIDlsI/mrrXot53pm6LvvIzpgb/lhY3lsITkuK3oh6rlt7FcclxuICAgIGxldCByYXkgPSBuZXcgUmF5KGZyb20sIGRpcik7XHJcbiAgICBsZXQgaGl0X3NvcnRfbGlzdCA9IGdldF9oaXRfc29ydF9saXN0KG9ial9saXN0LCByYXkpO1xyXG4gICAgaWYgKGhpdF9zb3J0X2xpc3QubGVuZ3RoICE9IDApIHsgLy8g5Zyo5b2x5a2Q5YWnXHJcbiAgICAgICAgcmV0dXJuIDAuNDU7IC8vIOS4jeimgeWkqum7kVxyXG4gICAgfSBlbHNlXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsZXJwKGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBhICsgdCAqIChiIC0gYSk7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENsaXBQbGFuZSB7XHJcbiAgICBOZWFyLFxyXG4gICAgRmFyLFxyXG4gICAgUmlnaHQsXHJcbiAgICBMZWZ0LFxyXG4gICAgVG9wLFxyXG4gICAgQm90dG9tXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGlwKHRyaWFuZ2xlOiBUcmlhbmdsZSxcclxuICAgIHYwX291dDogKHRyaWFuZ2xlOiBUcmlhbmdsZSkgPT4gYm9vbGVhbixcclxuICAgIHYxX291dDogKHRyaWFuZ2xlOiBUcmlhbmdsZSkgPT4gYm9vbGVhbixcclxuICAgIHYyX291dDogKHRyaWFuZ2xlOiBUcmlhbmdsZSkgPT4gYm9vbGVhbixcclxuICAgIHBsYW5lOiBDbGlwUGxhbmUpIHtcclxuXHJcbiAgICBsZXQgdl9jbGlwOiBUcmlhbmdsZVtdID0gW107XHJcblxyXG4gICAgbGV0IGdldENyb3NzUG9pbnQgPSBmdW5jdGlvbiAodjA6IFZlcnRleCwgdjE6IFZlcnRleCkge1xyXG4gICAgICAgIGxldCByYXkgPSBuZXcgUmF5NEQodjAuZ2V0X1ZlY3RvcjREKCksIHYxLmdldF9WZWN0b3I0RCgpKTtcclxuXHJcbiAgICAgICAgbGV0IHQgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAocGxhbmUpIHtcclxuICAgICAgICAgICAgY2FzZSBDbGlwUGxhbmUuRmFyOlxyXG4gICAgICAgICAgICAgICAgdCA9IHJheS50X3doZW5fel9lcXVhbF93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDbGlwUGxhbmUuTmVhcjpcclxuICAgICAgICAgICAgICAgIHQgPSByYXkudF93aGVuX3pfZXF1YWxfemVyb193KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDbGlwUGxhbmUuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICB0ID0gcmF5LnRfd2hlbl94X2VxdWFsX3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENsaXBQbGFuZS5MZWZ0OlxyXG4gICAgICAgICAgICAgICAgdCA9IHJheS50X3doZW5feF9lcXVhbF9taW51c193KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDbGlwUGxhbmUuVG9wOlxyXG4gICAgICAgICAgICAgICAgdCA9IHJheS50X3doZW5feV9lcXVhbF93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDbGlwUGxhbmUuQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgdCA9IHJheS50X3doZW5feV9lcXVhbF9taW51c193KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBWZXJ0ZXgubGVycCh2MCwgdjEsIHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHZvIGluIFxyXG4gICAgbGV0IGNsaXBfZmlyc3RfaW4gPSBmdW5jdGlvbiAodjA6IFZlcnRleCwgdjE6IFZlcnRleCwgdjI6IFZlcnRleCkge1xyXG4gICAgICAgIC8vIDEgdHJpYW5nbGUgdG8gMSB0cmlhbmdsZVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbmUnKTtcclxuICAgICAgICB2X2NsaXBbMF0gPSBuZXcgVHJpYW5nbGUodjAsIGdldENyb3NzUG9pbnQodjAsIHYxKSwgZ2V0Q3Jvc3NQb2ludCh2MCwgdjIpKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHZvIG91dFxyXG4gICAgbGV0IGNsaXBfZmlyc3Rfb3V0ID0gZnVuY3Rpb24gKHYwOiBWZXJ0ZXgsIHYxOiBWZXJ0ZXgsIHYyOiBWZXJ0ZXgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndHdvJyk7XHJcbiAgICAgICAgLy8gMSB0cmlhbmdsZSB0byAyIHRyaWFuZ2xlXHJcbiAgICAgICAgbGV0IGNyb3NzMSA9IGdldENyb3NzUG9pbnQodjIsIHYwKTtcclxuICAgICAgICBsZXQgY3Jvc3MyID0gZ2V0Q3Jvc3NQb2ludCh2MCwgdjEpO1xyXG5cclxuICAgICAgICB2X2NsaXBbMF0gPSBuZXcgVHJpYW5nbGUodjIsIGNyb3NzMSwgY3Jvc3MyKTtcclxuICAgICAgICB2X2NsaXBbMV0gPSBuZXcgVHJpYW5nbGUodjIsIGNyb3NzMiwgdjEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDmnIk456iu5oOF5rOBXHJcbiAgICBpZiAodjBfb3V0KHRyaWFuZ2xlKSkvL291dFxyXG4gICAge1xyXG4gICAgICAgIGlmICh2MV9vdXQodHJpYW5nbGUpKS8vIG91dCBvdXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2Ml9vdXQodHJpYW5nbGUpKS8vIG91dCBvdXQgb3V0IChubyBjbGlwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZnVsbCBvdXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIC8vb3V0IG91dCBpblxyXG4gICAgICAgICAgICAgICAgY2xpcF9maXJzdF9pbih0cmlhbmdsZS52MiwgdHJpYW5nbGUudjAsIHRyaWFuZ2xlLnYxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSAvL291dCBpbiBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2Ml9vdXQodHJpYW5nbGUpKS8vb3V0IGluIG91dFxyXG4gICAgICAgICAgICAgICAgY2xpcF9maXJzdF9pbih0cmlhbmdsZS52MSwgdHJpYW5nbGUudjIsIHRyaWFuZ2xlLnYwKTtcclxuICAgICAgICAgICAgZWxzZSAvLyBvdXQgaW4gaW5cclxuICAgICAgICAgICAgICAgIGNsaXBfZmlyc3Rfb3V0KHRyaWFuZ2xlLnYwLCB0cmlhbmdsZS52MSwgdHJpYW5nbGUudjIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgLy8gaW5cclxuICAgIHtcclxuICAgICAgICBpZiAodjFfb3V0KHRyaWFuZ2xlKSkvLyBpbiBvdXQgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodjJfb3V0KHRyaWFuZ2xlKSkvLyBpbiBvdXQgb3V0XHJcbiAgICAgICAgICAgICAgICBjbGlwX2ZpcnN0X2luKHRyaWFuZ2xlLnYwLCB0cmlhbmdsZS52MSwgdHJpYW5nbGUudjIpO1xyXG4gICAgICAgICAgICBlbHNlIC8vIGluIG91dCBpblxyXG4gICAgICAgICAgICAgICAgY2xpcF9maXJzdF9vdXQodHJpYW5nbGUudjEsIHRyaWFuZ2xlLnYyLCB0cmlhbmdsZS52MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgLy8gaW4gaW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2Ml9vdXQodHJpYW5nbGUpKS8vIGluIGluIG91dFxyXG4gICAgICAgICAgICAgICAgY2xpcF9maXJzdF9vdXQodHJpYW5nbGUudjIsIHRyaWFuZ2xlLnYwLCB0cmlhbmdsZS52MSk7XHJcbiAgICAgICAgICAgIGVsc2UgLy8gaW4gaW4gaW4gKG5vIGNsaXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZfY2xpcFswXSA9IHRyaWFuZ2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZfY2xpcDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGhIZWxwZXIge1xyXG4gICAgLy/kv67mraPpmaTms5XpjK/oqqRcclxuICAgIHN0YXRpYyBhY2NEaXYoYXJnMTogbnVtYmVyLCBhcmcyOiBudW1iZXIpIHtcclxuICAgICAgICAvL2NvZGUgZnJvbSBodHRwOi8vOHN0LmJsb2dzcG90LnR3LzIwMTIvMTAvanNidWcuaHRtbFxyXG4gICAgICAgIGxldCB0MSA9IDAsIHQyID0gMCwgcjEsIHIyO1xyXG4gICAgICAgIHRyeSB7IHQxID0gYXJnMS50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGggfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAgICAgdHJ5IHsgdDIgPSBhcmcyLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IH1cclxuXHJcbiAgICAgICAgcjEgPSBOdW1iZXIoYXJnMS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKVxyXG4gICAgICAgIHIyID0gTnVtYmVyKGFyZzIudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSlcclxuICAgICAgICByZXR1cm4gKHIxIC8gcjIpICogTWF0aC5wb3coMTAsIHQyIC0gdDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+u5q2j5Yqg5rOV6Yyv6KqkXHJcbiAgICBzdGF0aWMgYWNjQWRkKGFyZzE6IG51bWJlciwgYXJnMjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9jb2RlIGZyb20gaHR0cDovLzhzdC5ibG9nc3BvdC50dy8yMDEyLzEwL2pzYnVnLmh0bWxcclxuICAgICAgICBsZXQgcjEsIHIyLCBtLCBjO1xyXG4gICAgICAgIHRyeSB7IHIxID0gYXJnMS50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGggfSBjYXRjaCAoZSkgeyByMSA9IDAgfVxyXG4gICAgICAgIHRyeSB7IHIyID0gYXJnMi50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGggfSBjYXRjaCAoZSkgeyByMiA9IDAgfVxyXG4gICAgICAgIGMgPSBNYXRoLmFicyhyMSAtIHIyKTtcclxuICAgICAgICBtID0gTWF0aC5wb3coMTAsIE1hdGgubWF4KHIxLCByMikpXHJcbiAgICAgICAgaWYgKGMgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjbSA9IE1hdGgucG93KDEwLCBjKTtcclxuICAgICAgICAgICAgaWYgKHIxID4gcjIpIHtcclxuICAgICAgICAgICAgICAgIGFyZzEgPSBOdW1iZXIoYXJnMS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIGFyZzIgPSBOdW1iZXIoYXJnMi50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKSAqIGNtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJnMSA9IE51bWJlcihhcmcxLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpICogY207XHJcbiAgICAgICAgICAgICAgICBhcmcyID0gTnVtYmVyKGFyZzIudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFyZzEgPSBOdW1iZXIoYXJnMS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgYXJnMiA9IE51bWJlcihhcmcyLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKGFyZzEgKyBhcmcyKSAvIG1cclxuICAgIH1cclxufVxyXG5cclxuLy8g5Lul5YmN5a+r55qEY29kZVxyXG5leHBvcnQgY2xhc3MgRHJhd0hlbHBlciB7XHJcblxyXG4gICAgc3RhdGljIGRyYXdMaW5lKG9uZTogVmVjdG9yMkQsIHR3bzogVmVjdG9yMkQsIHZhbHVlOiBSR0JBLCBidWZmZXI6IEJ1ZmZlcjJEPFJHQkE+KSB7XHJcblxyXG4gICAgICAgIGxldCBub3cgPSBvbmU7XHJcbiAgICAgICAgbGV0IHRvID0gdHdvO1xyXG4gICAgICAgIGxldCBkaWZmID0gVmVjdG9yMkQubWludXModG8sIG5vdyk7XHJcblxyXG4gICAgICAgIGxldCBzdGVwID0gMTAwO1xyXG4gICAgICAgIGlmIChkaWZmLnkgPT0gMCkvL2hvcml6b25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL+W3pueVq+WIsOWPs1xyXG4gICAgICAgICAgICAgICAgbm93LnggPSBub3cueCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci5pc19sZWdhbF9pbmRleChub3cueCwgbm93LnkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3cueCA+IHRvLngpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnNldChub3cueCwgbm93LnksIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGlmZi54ID09IDApLy92ZXJ0aWNhbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8v5LiK55Wr5Yiw5LiLXHJcbiAgICAgICAgICAgICAgICBub3cueSA9IG5vdy55ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmICghYnVmZmVyLmlzX2xlZ2FsX2luZGV4KG5vdy54LCBub3cueSkpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdy55ID4gdG8ueSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXIuc2V0KG5vdy54LCBub3cueSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByYXRpbyA9IGRpZmYueCAvIGRpZmYueTtcclxuICAgICAgICBsZXQgYWJzX3IgPSBNYXRoLmFicyhyYXRpbyk7XHJcblxyXG4gICAgICAgIGlmIChyYXRpbyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGFic19yIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnkgPSBub3cueSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnggPSBub3cueCArIGFic19yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnRYID0gTWF0aC5mbG9vcihub3cueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWZmZXIuaXNfbGVnYWxfaW5kZXgoaW50WCwgbm93LnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5pc19vdmVyX3Bvc2l0aXZlKG5vdy54LCBub3cueSwgdG8ueCwgdG8ueSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIuc2V0KGludFgsIG5vdy55LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYWJzX3IgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdy55ID0gbm93LnkgKyAxIC8gYWJzX3I7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnggPSBub3cueCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludFkgPSBNYXRoLmZsb29yKG5vdy55KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci5pc19sZWdhbF9pbmRleChub3cueCwgaW50WSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmlzX292ZXJfcG9zaXRpdmUobm93LngsIG5vdy55LCB0by54LCB0by55KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5zZXQobm93LngsIGludFksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyYXRpbyA8IDApIHtcclxuICAgICAgICAgICAgaWYgKGFic19yIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnkgPSBub3cueSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnggPSBub3cueCAtIGFic19yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnRYID0gTWF0aC5mbG9vcihub3cueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWZmZXIuaXNfbGVnYWxfaW5kZXgoaW50WCwgbm93LnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5pc19vdmVyX25lZ2F0aXZlKG5vdy54LCBub3cueSwgdG8ueCwgdG8ueSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIuc2V0KGludFgsIG5vdy55LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYWJzX3IgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdy55ID0gbm93LnkgKyAxIC8gYWJzX3I7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnggPSBub3cueCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludFkgPSBNYXRoLmZsb29yKG5vdy55KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci5pc19sZWdhbF9pbmRleChub3cueCwgaW50WSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmlzX292ZXJfbmVnYXRpdmUobm93LngsIG5vdy55LCB0by54LCB0by55KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5zZXQobm93LngsIGludFksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRyYXdDaXJjbGUodmFsdWU6IFJHQkEsIGJ1ZmZlcjogQnVmZmVyMkQ8UkdCQT4pIHtcclxuICAgICAgICBsZXQgaXQgPSA1MDtcclxuICAgICAgICBsZXQgZGVsdGEgPSAyICogTWF0aC5QSSAvIGl0O1xyXG4gICAgICAgIGxldCBSID0gOTtcclxuICAgICAgICBsZXQgY2VudGVyID0gbmV3IFZlY3RvcjJEKDEwLCAxMCk7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGhlZGEgPSAtTWF0aC5QSSAvIDM7XHJcblxyXG4gICAgICAgIC8v55Wr5ZyTXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub3dYID0gTWF0aC5mbG9vcihjZW50ZXIueCArIFIgKiBNYXRoLmNvcyhzdGFydFRoZWRhICsgZGVsdGEgKiBpKSk7XHJcbiAgICAgICAgICAgIGxldCBub3dZID0gTWF0aC5mbG9vcihjZW50ZXIueSArIFIgKiBNYXRoLnNpbihzdGFydFRoZWRhICsgZGVsdGEgKiBpKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV4dFggPSBNYXRoLmZsb29yKGNlbnRlci54ICsgUiAqIE1hdGguY29zKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIChpICsgMSkpKTtcclxuICAgICAgICAgICAgbGV0IG5leHRZID0gTWF0aC5mbG9vcihjZW50ZXIueSArIFIgKiBNYXRoLnNpbihzdGFydFRoZWRhICsgZGVsdGEgKiAoaSArIDEpKSk7XHJcblxyXG4gICAgICAgICAgICBEcmF3SGVscGVyLmRyYXdMaW5lV3JhcHBlcihuZXcgVmVjdG9yMkQobm93WCwgbm93WSksIG5ldyBWZWN0b3IyRChuZXh0WCwgbmV4dFkpLCB2YWx1ZSwgYnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBkcmF3U3Rhcih2YWx1ZTogUkdCQSwgYnVmZmVyOiBCdWZmZXIyRDxSR0JBPikge1xyXG4gICAgICAgIGxldCBpdCA9IDU7XHJcbiAgICAgICAgbGV0IGRlbHRhID0gMiAqIE1hdGguUEkgLyBpdDtcclxuICAgICAgICBsZXQgUiA9IDk7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IG5ldyBWZWN0b3IyRCgxMCwgMTApO1xyXG4gICAgICAgIGxldCBzdGFydFRoZWRhID0gLU1hdGguUEkgLyAzO1xyXG5cclxuICAgICAgICAvL+eVq+aYn+aYn1xyXG4gICAgICAgIGxldCBrID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vd1ggPSBNYXRoLmZsb29yKGNlbnRlci54ICsgUiAqIE1hdGguY29zKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIGspKTtcclxuICAgICAgICAgICAgbGV0IG5vd1kgPSBNYXRoLmZsb29yKGNlbnRlci55ICsgUiAqIE1hdGguc2luKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIGspKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXh0WCA9IE1hdGguZmxvb3IoY2VudGVyLnggKyBSICogTWF0aC5jb3Moc3RhcnRUaGVkYSArIGRlbHRhICogKGsgKyAyKSkpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFkgPSBNYXRoLmZsb29yKGNlbnRlci55ICsgUiAqIE1hdGguc2luKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIChrICsgMikpKTtcclxuXHJcbiAgICAgICAgICAgIERyYXdIZWxwZXIuZHJhd0xpbmVXcmFwcGVyKG5ldyBWZWN0b3IyRChub3dYLCBub3dZKSwgbmV3IFZlY3RvcjJEKG5leHRYLCBuZXh0WSksIHZhbHVlLCBidWZmZXIpO1xyXG4gICAgICAgICAgICBrID0gayArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkcmF3TGluZVdyYXBwZXIodDA6IFZlY3RvcjJELCB0MTogVmVjdG9yMkQsIHZhbHVlOiBSR0JBLCBidWZmZXI6IEJ1ZmZlcjJEPFJHQkE+KSB7XHJcbiAgICAgICAgLy/lvp7kuIrlvoDkuIvnlatcclxuICAgICAgICBpZiAodDAueSA8IHQxLnkpXHJcbiAgICAgICAgICAgIERyYXdIZWxwZXIuZHJhd0xpbmUodDAsIHQxLCB2YWx1ZSwgYnVmZmVyKTtcclxuICAgICAgICBlbHNlIGlmICh0MS55IDwgdDAueSlcclxuICAgICAgICAgICAgRHJhd0hlbHBlci5kcmF3TGluZSh0MSwgdDAsIHZhbHVlLCBidWZmZXIpO1xyXG4gICAgICAgIGVsc2UgLy/msLTlubPnt5pcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5b6e5bem5b6A5Y+z55WrXHJcbiAgICAgICAgICAgIGlmICh0MC54IDwgdDEueClcclxuICAgICAgICAgICAgICAgIERyYXdIZWxwZXIuZHJhd0xpbmUodDAsIHQxLCB2YWx1ZSwgYnVmZmVyKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodDEueCA8IHQwLngpXHJcbiAgICAgICAgICAgICAgICBEcmF3SGVscGVyLmRyYXdMaW5lKHQxLCB0MCwgdmFsdWUsIGJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi9WZWN0b3JcIjtcclxuaW1wb3J0IHsgZGVncmVlX3RvX1JhZCB9IGZyb20gJy4vVG9vbCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zZm9ybSB7XHJcbiAgICB4QXhpczogVmVjdG9yO1xyXG4gICAgeUF4aXM6IFZlY3RvcjtcclxuICAgIHpBeGlzOiBWZWN0b3I7XHJcbiAgICBwb3NpdGlvbjogVmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoeEF4aXM6IFZlY3RvciwgeUF4aXM6IFZlY3RvciwgekF4aXM6IFZlY3RvciwgcG9zaXRpb246IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMueEF4aXMgPSB4QXhpcztcclxuICAgICAgICB0aGlzLnlBeGlzID0geUF4aXM7XHJcbiAgICAgICAgdGhpcy56QXhpcyA9IHpBeGlzO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtUG9pbnQodHJhbnNmb3JtOiBUcmFuc2Zvcm0sIHBvaW50OiBWZWN0b3IpIHtcclxuICAgICAgICBsZXQgdmVjdG9yWCA9IHRyYW5zZm9ybS54QXhpcy5tdWx0aXBseShwb2ludC54KTtcclxuICAgICAgICBsZXQgdmVjdG9yWSA9IHRyYW5zZm9ybS55QXhpcy5tdWx0aXBseShwb2ludC55KTtcclxuICAgICAgICBsZXQgdmVjdG9yWiA9IHRyYW5zZm9ybS56QXhpcy5tdWx0aXBseShwb2ludC56KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybS5wb3NpdGlvbi5hZGQodmVjdG9yWCkuYWRkKHZlY3RvclkpLmFkZCh2ZWN0b3JaKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtVmVjdG9yKHRyYW5zZm9ybTogVHJhbnNmb3JtLCB2ZXJ0ZXg6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCB2ZWN0b3JYID0gdHJhbnNmb3JtLnhBeGlzLm11bHRpcGx5KHZlcnRleC54KTtcclxuICAgICAgICBsZXQgdmVjdG9yWSA9IHRyYW5zZm9ybS55QXhpcy5tdWx0aXBseSh2ZXJ0ZXgueSk7XHJcbiAgICAgICAgbGV0IHZlY3RvclogPSB0cmFuc2Zvcm0uekF4aXMubXVsdGlwbHkodmVydGV4LnopO1xyXG5cclxuICAgICAgICByZXR1cm4gdmVjdG9yWC5hZGQodmVjdG9yWSkuYWRkKHZlY3RvclopO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1UcmFuc2Zvcm0odHJhbnNmb3JtOiBUcmFuc2Zvcm0sIGlucHV0VHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyYW5zZm9ybShcclxuICAgICAgICAgICAgVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih0cmFuc2Zvcm0sIGlucHV0VHJhbnNmb3JtLnhBeGlzKSxcclxuICAgICAgICAgICAgVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih0cmFuc2Zvcm0sIGlucHV0VHJhbnNmb3JtLnlBeGlzKSxcclxuICAgICAgICAgICAgVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih0cmFuc2Zvcm0sIGlucHV0VHJhbnNmb3JtLnpBeGlzKSxcclxuICAgICAgICAgICAgVHJhbnNmb3JtLnRyYW5zZm9ybVBvaW50KHRyYW5zZm9ybSwgaW5wdXRUcmFuc2Zvcm0ucG9zaXRpb24pLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJvdGF0ZUJ5WihkZWdyZWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByYWRpYW4gPSBkZWdyZWVfdG9fUmFkKGRlZ3JlZSk7XHJcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWRpYW4pLCBzID0gTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgICAgICBsZXQgeEF4aXMgPSBuZXcgVmVjdG9yKGMsIHMsIDApO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IG5ldyBWZWN0b3IoLXMsIGMsIDApO1xyXG4gICAgICAgIGxldCB6QXhpcyA9IG5ldyBWZWN0b3IoMCwgMCwgMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKFxyXG4gICAgICAgICAgICB4QXhpcyxcclxuICAgICAgICAgICAgeUF4aXMsXHJcbiAgICAgICAgICAgIHpBeGlzLFxyXG4gICAgICAgICAgICBWZWN0b3IuemVybyxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByb3RhdGVCeVkoZGVncmVlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcmFkaWFuID0gZGVncmVlX3RvX1JhZChkZWdyZWUpO1xyXG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkaWFuKSwgcyA9IE1hdGguc2luKHJhZGlhbik7XHJcbiAgICAgICAgbGV0IHpBeGlzID0gbmV3IFZlY3RvcihzLCAwLCBjKTtcclxuICAgICAgICBsZXQgeEF4aXMgPSBuZXcgVmVjdG9yKGMsIDAsIC1zKTtcclxuICAgICAgICBsZXQgeUF4aXMgPSBuZXcgVmVjdG9yKDAsIDEsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRyYW5zZm9ybShcclxuICAgICAgICAgICAgeEF4aXMsXHJcbiAgICAgICAgICAgIHlBeGlzLFxyXG4gICAgICAgICAgICB6QXhpcyxcclxuICAgICAgICAgICAgVmVjdG9yLnplcm8sXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcm90YXRlQnlYKGRlZ3JlZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGRlZ3JlZV90b19SYWQoZGVncmVlKTtcclxuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZGlhbiksIHMgPSBNYXRoLnNpbihyYWRpYW4pO1xyXG4gICAgICAgIGxldCB4QXhpcyA9IG5ldyBWZWN0b3IoMSwgMCwgMCk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gbmV3IFZlY3RvcigwLCBjLCBzKTtcclxuICAgICAgICBsZXQgekF4aXMgPSBuZXcgVmVjdG9yKDAsIC1zLCBjKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgIHhBeGlzLFxyXG4gICAgICAgICAgICB5QXhpcyxcclxuICAgICAgICAgICAgekF4aXMsXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoMCwgMCwgMCksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgb2Zmc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyYW5zZm9ybShcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAwLCAwKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigwLCAxLCAwKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigwLCAwLCAxKSxcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcih4LCB5LCB6KSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFRyYW5zZm9ybSBmcm9tICcuL1RyYW5zZm9ybSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InXHJcbmltcG9ydCBWZXJ0ZXggZnJvbSAnLi9WZXJ0ZXgnXHJcbmltcG9ydCBDYW1lcmEgZnJvbSAnLi9DYW1lcmEnO1xyXG5pbXBvcnQgUGxhbmUgZnJvbSAnLi9QbGFuZSc7XHJcbmltcG9ydCBSYXkgZnJvbSAnLi9SYXknO1xyXG5pbXBvcnQgUmFzdGVyaXplciBmcm9tICcuL1Jhc3Rlcml6ZXInO1xyXG5pbXBvcnQgVGV4dHVyZTJEIGZyb20gJy4vVGV4dHVyZTJEJztcclxuaW1wb3J0IHsgbnVtYmVyX2VxdWFsIH0gZnJvbSAnLi9Ub29sJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyaWFuZ2xlIHtcclxuXHJcbiAgICAvLyDpgJnkupvpu5566YO95pivMFxyXG4gICAgc3RhdGljIGNhbGN1bGF0ZV/OsV/Osl/OsyhzMDogVmVjdG9yLCBzMTogVmVjdG9yLCBzMjogVmVjdG9yLCBQOiBWZWN0b3IpIHtcclxuICAgICAgICBsZXQgZGlmZiA9IFZlY3Rvci5taW51cyhQLCBzMCk7XHJcblxyXG4gICAgICAgIC8vIOaxgnJheShQLFMwLVMyKeWSjHJheShTMCxTMS1TMinnmoTkuqTpu55cclxuICAgICAgICAvLyDnrYnlkIzmlrzmsYJyYXkoUCxTMC1TMinlkozlubPpnaLnmoTkuqTpu55cclxuICAgICAgICBsZXQgZGlyMDEgPSBWZWN0b3IubWludXMoczEsIHMwKTtcclxuICAgICAgICBsZXQgZGlyMDIgPSBWZWN0b3IubWludXMoczIsIHMwKTtcclxuICAgICAgICBsZXQgbiA9IG5ldyBWZWN0b3IoLWRpcjAxLnksIGRpcjAxLngsIDApO1xyXG4gICAgICAgIGxldCByYXkgPSBuZXcgUmF5KFAsIGRpcjAyLm11bHRpcGx5KC0xKSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFBsYW5lLmhpdChyYXksIG5ldyBQbGFuZShzMCwgbikpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3VsdCkgeyAvLyDpgIDljJbmiJDnm7Tnt5rnmoTkuInop5LlvaLmiY3mnInkuZ/lj6/og71cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+W5s+ihjCcsIHMwLCBzMSwgczIsIFApO1xyXG5cclxuICAgICAgICAgICAgLy8g5LiN6JmV55CGXHJcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCDOsTogMSwgzrI6IDAsIM6zOiAwIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcF9vbl9kaXIwMSA9IHJlc3VsdC5oaXRfcG9zO1xyXG4gICAgICAgIGxldCB2ZWN0b3JfzrEgPSBWZWN0b3IubWludXMocF9vbl9kaXIwMSwgczApO1xyXG4gICAgICAgIGxldCB2ZWN0b3JfzrIgPSBWZWN0b3IubWludXMoZGlmZiwgdmVjdG9yX86xKTtcclxuXHJcbiAgICAgICAgLy8g5pOL5o6JZGlyMDHjgIFkaXIwMuaYr3nou7jlubPooYznmoTmg4Xms4FcclxuICAgICAgICAvLyDmta7pu57mlbjoq4vnlKggbnVtYmVyX2VxdWFs77yM5LiN54S25pyDR0dcclxuICAgICAgICAvLyDopovlnJbvvJpidWcvZmxvYXRfcG9pbnRfY29tcGFpcmVfZXJyb3IoZml4ZWQpL2J1Z193aGVuX2NsaXBwaW5nXzIuanBnXHJcbiAgICAgICAgLy8g5YW25a+m55W25Yid55u05o6l55So6ZW35bqm5q+U566XzrHjgIHOsuS4jeaYr+abtOewoeWWruWXju+8n1xyXG4gICAgICAgIGxldCDOsSA9IG51bWJlcl9lcXVhbChkaXIwMS54LCAwKSA/IHZlY3Rvcl/OsS55IC8gZGlyMDEueSA6IHZlY3Rvcl/OsS54IC8gZGlyMDEueDtcclxuICAgICAgICBsZXQgzrIgPSBudW1iZXJfZXF1YWwoZGlyMDIueCwgMCkgPyB2ZWN0b3JfzrIueSAvIGRpcjAyLnkgOiB2ZWN0b3JfzrIueCAvIGRpcjAyLng7XHJcbiAgICAgICAgaWYgKGlzTmFOKM6xKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2ZWN0b3JfzrEueCwgZGlyMDEueCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNOYU4ozrIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZlY3Rvcl/Osi54LCBkaXIwMi54KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IM6zID0gMSAtIM6xIC0gzrI7XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIM6xLCDOsiwgzrMgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc19pbl90cmlhbmdsZSjOsTogbnVtYmVyLCDOsjogbnVtYmVyLCDOszogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuICjOsSA+PSAwICYmIM6yID49IDAgJiYgzrMgPj0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Zug54K6Y2FsY3VsYXRlX86xX86yX86z5a+m5L2c55qE5pa55byP77yM5omA5Lul6aCG5bqP5pivzrPjgIHOseOAgc6yIPCfmJ1cclxuICAgIHN0YXRpYyBpbnRlcnBvbGF0aW9uKM6zOiBudW1iZXIsIM6xOiBudW1iZXIsIM6yOiBudW1iZXIsIHYwOiBudW1iZXIsIHYxOiBudW1iZXIsIHYyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdjAgKiDOsyArIHYxICogzrEgKyB2MiAqIM6yO1xyXG4gICAgfVxyXG5cclxuICAgIHYwOiBWZXJ0ZXg7XHJcbiAgICB2MTogVmVydGV4O1xyXG4gICAgdjI6IFZlcnRleDtcclxuICAgIGNvbnN0cnVjdG9yKHB2MDogVmVydGV4LCBwdjE6IFZlcnRleCwgcHYyOiBWZXJ0ZXgpIHtcclxuICAgICAgICB0aGlzLnYwID0gcHYwO1xyXG4gICAgICAgIHRoaXMudjEgPSBwdjE7XHJcbiAgICAgICAgdGhpcy52MiA9IHB2MjtcclxuICAgICAgICB0aGlzLnZfcyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdl9zOiBWZWN0b3JbXSB8IG51bGw7XHJcbiAgICByYXN0ZXJpemUocGNhbWVyYTogQ2FtZXJhLCB3b3JsZFRyYW5zZm9ybTogVHJhbnNmb3JtLCB0ZXh0dXJlOiBUZXh0dXJlMkQpIHtcclxuICAgICAgICB0aGlzLnZfcyA9IFJhc3Rlcml6ZXIucHJvY2Vzcyh0aGlzLCBwY2FtZXJhLCB3b3JsZFRyYW5zZm9ybSwgdGV4dHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZfcyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0Q291bnQgPSB0aGlzLnZfcy5sZW5ndGggLyAzO1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDw9IHRDb3VudDsgKytjKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDMgKiBjIC0gMTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLnZfc1tpbmRleF0ueCwgdGhpcy52X3NbaW5kZXhdLnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHRoaXMudl9zW2luZGV4IC0gMl0ueCwgdGhpcy52X3NbaW5kZXggLSAyXS55KTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnZfc1tpbmRleCAtIDFdLngsIHRoaXMudl9zW2luZGV4IC0gMV0ueSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy52X3NbaW5kZXhdLngsIHRoaXMudl9zW2luZGV4XS55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IGxlcnAsIG51bWJlcl9lcXVhbCwgY2xhbXAgfSBmcm9tICcuL1Rvb2wnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xyXG5cclxuICAgIHN0YXRpYyBtaW5fbWF4KHYwOiBWZWN0b3IsIHYxOiBWZWN0b3IsIHYyOiBWZWN0b3IpIHtcclxuXHJcbiAgICAgICAgbGV0IG1pbiA9IG5ldyBWZWN0b3IoTWF0aC5taW4oTWF0aC5taW4odjAueCwgdjEueCksIHYyLngpLCBNYXRoLm1pbihNYXRoLm1pbih2MC55LCB2MS55KSwgdjIueSksIE1hdGgubWluKE1hdGgubWluKHYwLnosIHYxLnopLCB2Mi56KSk7XHJcbiAgICAgICAgbGV0IG1heCA9IG5ldyBWZWN0b3IoTWF0aC5tYXgoTWF0aC5tYXgodjAueCwgdjEueCksIHYyLngpLCBNYXRoLm1heChNYXRoLm1heCh2MC55LCB2MS55KSwgdjIueSksIE1hdGgubWF4KE1hdGgubWF4KHYwLnosIHYxLnopLCB2Mi56KSk7XHJcbiAgICAgICAgcmV0dXJuIHsgbWluLCBtYXggfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2FsY3VsYXRlX25vcm1hbCh2MDogVmVjdG9yLCB2MTogVmVjdG9yLCB2MjogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IHYwMSA9IFZlY3Rvci5taW51cyh2MSwgdjApO1xyXG4gICAgICAgIGxldCB2MDIgPSBWZWN0b3IubWludXModjIsIHYwKTtcclxuICAgICAgICBsZXQgbm9ybWFsID0gVmVjdG9yLmNyb3NzKHYwMSwgdjAyKTtcclxuICAgICAgICByZXR1cm4gbm9ybWFsLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjYWxjdWxhdGVfY2VudGVyKHYwOiBWZWN0b3IsIHYxOiBWZWN0b3IsIHYyOiBWZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdjAuYWRkKHYxKS5hZGQodjIpLm11bHRpcGx5KDEgLyAzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXYodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih1LCB2LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXAgPSBuZXcgVmVjdG9yKDAsIDEsIDApO1xyXG4gICAgc3RhdGljIHplcm8gPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xyXG5cclxuICAgIHN0YXRpYyByZWZsZWN0KEk6IFZlY3RvciwgTjogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IEwgPSAtMiAqIFZlY3Rvci5kb3QoSSwgTilcclxuICAgICAgICByZXR1cm4gTi5tdWx0aXBseShMKS5hZGQoSSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZChBOiBWZWN0b3IsIEI6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3RvcihCLnggKyBBLngsIEIueSArIEEueSwgQi56ICsgQS56KTtcclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtaW51cyhBOiBWZWN0b3IsIEI6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3RvcihBLnggLSBCLngsIEEueSAtIEIueSwgQS56IC0gQi56KTtcclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtdWx0aXBseShBOiBWZWN0b3IsIHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3RvcihBLnggKiBzLCBBLnkgKiBzLCBBLnogKiBzKTtcclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtdWx0aXBseTMoQTogVmVjdG9yLCBCOiBWZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihBLnggKiBCLngsIEEueSAqIEIueSwgQS56ICogQi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3Jvc3MoQTogVmVjdG9yLCBCOiBWZWN0b3IpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IG5ldyBWZWN0b3IoQS55ICogQi56IC0gQS56ICogQi55LCAtQS54ICogQi56ICsgQS56ICogQi54LCBBLnggKiBCLnkgLSBBLnkgKiBCLngpO1xyXG4gICAgICAgIHJldHVybiB0ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkb3QoQTogVmVjdG9yLCBCOiBWZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gQS54ICogQi54ICsgQS55ICogQi55ICsgQS56ICogQi56O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBlcXVhbChBOiBWZWN0b3IsIEI6IFZlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBudW1iZXJfZXF1YWwoQS54LCBCLngpICYmIG51bWJlcl9lcXVhbChBLnksIEIueSkgJiYgbnVtYmVyX2VxdWFsKEEueiwgQi56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbGVycChBOiBWZWN0b3IsIEI6IFZlY3RvciwgdDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXHJcbiAgICAgICAgICAgIGxlcnAoQS54LCBCLngsIHQpLFxyXG4gICAgICAgICAgICBsZXJwKEEueSwgQi55LCB0KSxcclxuICAgICAgICAgICAgbGVycChBLnosIEIueiwgdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHg6IG51bWJlciA9IDA7XHJcbiAgICB5OiBudW1iZXIgPSAwO1xyXG4gICAgejogbnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKHB4OiBudW1iZXIsIHB5OiBudW1iZXIsIHB6OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSBweDtcclxuICAgICAgICB0aGlzLnkgPSBweTtcclxuICAgICAgICB0aGlzLnogPSBwejtcclxuICAgIH1cclxuXHJcbiAgICBjbGFtcF94KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IGNsYW1wKHRoaXMueCwgbWluLCBtYXgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYW1wX3kobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy55ID0gY2xhbXAodGhpcy55LCBtaW4sIG1heCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuZ3RoKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56KTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxpemUoKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmxlbmd0aCgpO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMueCAvIHRlbXA7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy55IC8gdGVtcDtcclxuICAgICAgICB0aGlzLnogPSB0aGlzLnogLyB0ZW1wO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChBOiBWZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gVmVjdG9yLmFkZCh0aGlzLCBBKTtcclxuICAgIH1cclxuXHJcbiAgICBtaW51cyhBOiBWZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gVmVjdG9yLm1pbnVzKHRoaXMsIEEpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBWZWN0b3IubXVsdGlwbHkodGhpcywgcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbmVnYXRpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5tdWx0aXBseSh0aGlzLCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgVmVjdG9yMkQoKSB7XHJcbiAgICAgICAgdGhpcy56ID0gMDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJEIHtcclxuXHJcbiAgICBzdGF0aWMgYWRkKEE6IFZlY3RvcjJELCBCOiBWZWN0b3IyRCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3RvcjJEKEIueCArIEEueCwgQi55ICsgQS55KTtcclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtaW51cyhBOiBWZWN0b3IyRCwgQjogVmVjdG9yMkQpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IG5ldyBWZWN0b3IyRChBLnggLSBCLngsIEEueSAtIEIueSk7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBcclxuICAgIH1cclxuXHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGx1cyhwOiBWZWN0b3IyRCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54ICsgcC54LCB0aGlzLnkgKyBwLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54ICogcywgdGhpcy55ICogcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiKCBcIiArIHRoaXMueCArIFwiICwgXCIgKyB0aGlzLnkgKyBcIiApXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjb3IgZnJvbSBcIi4vVmVjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3I0RCB7XHJcbiAgICBwOiBWZWNvcjtcclxuICAgIHc6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwOiBWZWNvciwgdzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgfVxyXG59OyIsIlxyXG5pbXBvcnQgeyBsZXJwIH0gZnJvbSAnLi9Ub29sJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3RvcidcclxuaW1wb3J0IFZlY3RvcjREIGZyb20gJy4vVmVjdG9yNEQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVydGV4IHtcclxuICAgIHN0YXRpYyBidWlsZF92ZXJ0ZXgocDogVmVjdG9yLCBuOiBWZWN0b3IsIHc6IG51bWJlciwgdTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdmVydGV4ID0gbmV3IFZlcnRleChwLCBuLCB3LCB1LCB2KTtcclxuICAgICAgICByZXR1cm4gdmVydGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsZXJwKHYwOiBWZXJ0ZXgsIHYxOiBWZXJ0ZXgsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwID0gVmVjdG9yLmxlcnAodjAucCwgdjEucCwgdCk7XHJcbiAgICAgICAgbGV0IG4gPSBWZWN0b3IubGVycCh2MC5uLCB2MS5uLCB0KTtcclxuICAgICAgICBsZXQgdyA9IGxlcnAodjAudywgdjEudywgdCk7XHJcbiAgICAgICAgbGV0IHUgPSBsZXJwKHYwLnUsIHYxLnUsIHQpO1xyXG4gICAgICAgIGxldCB2ID0gbGVycCh2MC52LCB2MS52LCB0KTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlcnRleChwLCBuLCB3LCB1LCB2KTtcclxuICAgIH1cclxuXHJcbiAgICBwOiBWZWN0b3I7XHJcbiAgICB3OiBudW1iZXI7XHJcbiAgICB1OiBudW1iZXI7XHJcbiAgICB2OiBudW1iZXI7XHJcbiAgICBuOiBWZWN0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IocDogVmVjdG9yLCBuOiBWZWN0b3IsIHc6IG51bWJlciwgdTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHRoaXMubiA9IG47XHJcbiAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICB0aGlzLnUgPSB1O1xyXG4gICAgICAgIHRoaXMudiA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZXJ0ZXgodGhpcy5wLmNsb25lKCksIHRoaXMubi5jbG9uZSgpLCB0aGlzLncsIHRoaXMudSwgdGhpcy52KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVfcChwOiBWZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZV93KHc6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X1ZlY3RvcjREKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yNEQodGhpcy5wLCB0aGlzLncpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQnVmZmVyMkQgZnJvbSBcIi4vTWF0aC9CdWZmZXIyRFwiO1xyXG5pbXBvcnQgQ2F2bmFzSGVscGVyIGZyb20gXCIuL01hdGgvQ2FudmFzSGVscGVyXCI7XHJcbmltcG9ydCBSR0JBIGZyb20gXCIuL01hdGgvUkdCQVwiO1xyXG5pbXBvcnQgU2FtcGxlciBmcm9tIFwiLi9NYXRoL1NhbXBsZXJcIjtcclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL01hdGgvVmVjdG9yMkRcIjtcclxuaW1wb3J0IHsgTWF0aEhlbHBlciwgRHJhd0hlbHBlciB9IGZyb20gXCIuL01hdGgvVG9vbFwiO1xyXG5pbXBvcnQgSEhlbHBlciBmcm9tIFwiLi9NYXRoL0hIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RUZXh0dXJlQXBwIHtcclxuXHJcbiAgICBjYW52YXNfd2lkdGggPSA2MDA7XHJcbiAgICBjYW52YXNfaGVpZ2h0ID0gNjAwO1xyXG5cclxuICAgIHJvd19jb3VudCA9IDIwO1xyXG4gICAgY29sdW1lX2NvdW50ID0gMjA7XHJcblxyXG4gICAgcmVjdF93ID0gdGhpcy5jYW52YXNfd2lkdGggLyB0aGlzLmNvbHVtZV9jb3VudDtcclxuICAgIHJlY3RfaCA9IHRoaXMuY2FudmFzX2hlaWdodCAvIHRoaXMucm93X2NvdW50O1xyXG4gICAgYnVmZmVyID0gbmV3IEJ1ZmZlcjJEPFJHQkE+KHRoaXMuY29sdW1lX2NvdW50LCB0aGlzLnJvd19jb3VudCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgICAgICBISGVscGVyLiQoJ2J0bl9yZXNldCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgSEhlbHBlci4kKCdtb3ZlX3JpZ2h0Jykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgSEhlbHBlci4kKCdtb3ZlX3VwJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgSEhlbHBlci4kKCdjYW52YXMnKS5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlQnVsaWQobmV3IFZlY3RvcjJEKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRleHR1cmUyRCh1djogVmVjdG9yMkQpIHtcclxuICAgICAgICBsZXQgeyByZWN0VVYsIE5XLCBORSwgU1csIFNFLCBjb2xvciB9ID0gU2FtcGxlci50ZXh0dXJlMkQodXYsIHRoaXMuYnVmZmVyKTtcclxuXHJcbiAgICAgICAgLy/nlas05YCL6YSw6L+R6bueXHJcbiAgICAgICAgdGhpcy5kcmF3UG9pbnRCeUdyaWRJbmRleChOVyk7XHJcbiAgICAgICAgdGhpcy5kcmF3UG9pbnRCeUdyaWRJbmRleChORSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UG9pbnRCeUdyaWRJbmRleChTVyk7XHJcbiAgICAgICAgdGhpcy5kcmF3UG9pbnRCeUdyaWRJbmRleChTRSk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmVjdChOVyk7XHJcbiAgICAgICAgdGhpcy5kcmF3UG9pbnRCeVJlY3RVVihOVywgcmVjdFVWKTtcclxuXHJcbiAgICAgICAgLy8g6aGv56S65pyA5b6M55qE57WQ5p6cXHJcbiAgICAgICAgbGV0IGN0eCA9IENhdm5hc0hlbHBlci5nZXRfY29udGV4dCgnY2FudmFzMicpO1xyXG4gICAgICAgIGlmICghY3R4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdHggZ2V0IGZhaWxlZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBDYXZuYXNIZWxwZXIuY29udmVydChjb2xvcik7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDMwLCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1VWKCkge1xyXG4gICAgICAgIGxldCB1ID0gcGFyc2VGbG9hdChISGVscGVyLiQoXCJ1XCIpLnZhbHVlKTtcclxuICAgICAgICBsZXQgdiA9IHBhcnNlRmxvYXQoSEhlbHBlci4kKFwidlwiKS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlMkQobmV3IFZlY3RvcjJEKHUsIHYpKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKSB7XHJcbiAgICAgICAgbGV0IHUgPSBwYXJzZUZsb2F0KEhIZWxwZXIuJChcInVcIikudmFsdWUpO1xyXG5cclxuICAgICAgICBsZXQgZ3JpZF91ID0gMSAvIHRoaXMuY29sdW1lX2NvdW50O1xyXG4gICAgICAgIHUgPSBNYXRoSGVscGVyLmFjY0FkZCh1LCBncmlkX3UpO1xyXG5cclxuICAgICAgICBISGVscGVyLiQoXCJ1XCIpLnZhbHVlID0gdS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVVcCgpIHtcclxuICAgICAgICBsZXQgdiA9IHBhcnNlRmxvYXQoSEhlbHBlci4kKFwidlwiKS52YWx1ZSk7XHJcblxyXG4gICAgICAgIGxldCBncmlkX3YgPSAxIC8gdGhpcy5yb3dfY291bnQ7XHJcbiAgICAgICAgdiA9IE1hdGhIZWxwZXIuYWNjQWRkKHYsIGdyaWRfdik7XHJcblxyXG4gICAgICAgIEhIZWxwZXIuJChcInZcIikudmFsdWUgPSB2LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVCdWxpZChQOiBWZWN0b3IyRCkge1xyXG4gICAgICAgIGxldCB1ID0gUC54IC8gdGhpcy5jYW52YXNfd2lkdGg7XHJcbiAgICAgICAgbGV0IHYgPSBQLnkgLyB0aGlzLmNhbnZhc19oZWlnaHQ7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcl91diA9IG5ldyBWZWN0b3IyRCh1LCB2KTtcclxuICAgICAgICBsZXQgdXYgPSBTYW1wbGVyLmJ1ZmZlcl90b191dl9zcGFjZShidWZmZXJfdXYpO1xyXG5cclxuICAgICAgICBISGVscGVyLiQoXCJ1XCIpLnZhbHVlID0gdXYueC50b1N0cmluZygpO1xyXG4gICAgICAgIEhIZWxwZXIuJChcInZcIikudmFsdWUgPSB1di55LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuUmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5jb2x1bWVfY291bnQ7IHgrKylcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnJvd19jb3VudDsgeSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXIuc2V0KHgsIHksIG5ldyBSR0JBKDAsIDAsIDAsIDEpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgRHJhd0hlbHBlci5kcmF3U3RhcihSR0JBLmdvbGRlbiwgdGhpcy5idWZmZXIpO1xyXG4gICAgICAgIHRoaXMuUmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVuZGVyKCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0J1ZmZlcigpO1xyXG4gICAgICAgIHRoaXMuZHJhd1VWKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0J1ZmZlcigpIHtcclxuICAgICAgICBsZXQgY3R4ID0gQ2F2bmFzSGVscGVyLmdldF9jb250ZXh0KCdjYW52YXMnKTtcclxuICAgICAgICBpZiAoIWN0eCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3R4IGdldCBmYWlsZWQnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDYwMCwgNjAwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnJvd19jb3VudDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5jb2x1bWVfY291bnQ7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IENhdm5hc0hlbHBlci5jb252ZXJ0KHRoaXMuYnVmZmVyLmdldCh4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgciA9IDE7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCAqIHRoaXMucmVjdF93ICsgciwgeSAqIHRoaXMucmVjdF9oICsgciwgdGhpcy5yZWN0X3cgLSByLCB0aGlzLnJlY3RfaCAtIHIpO1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIGRyYXdQb2ludEJ5R3JpZEluZGV4KFA6IFZlY3RvcjJEKSB7XHJcblxyXG4gICAgICAgIGxldCBjdHggPSBDYXZuYXNIZWxwZXIuZ2V0X2NvbnRleHQoJ2NhbnZhcycpO1xyXG4gICAgICAgIGlmICghY3R4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdHggZ2V0IGZhaWxlZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xyXG5cclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMCwxKSc7XHJcbiAgICAgICAgbGV0IHIgPSA2O1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgoUC54ICsgMC41KSAqIHRoaXMucmVjdF93IC0gMC41ICogciwgKFAueSArIDAuNSkgKiB0aGlzLnJlY3RfaCAtIDAuNSAqIHIsIHIsIHIpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3UmVjdChQOiBWZWN0b3IyRCkge1xyXG4gICAgICAgIGxldCBjdHggPSBDYXZuYXNIZWxwZXIuZ2V0X2NvbnRleHQoJ2NhbnZhcycpO1xyXG4gICAgICAgIGlmICghY3R4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdHggZ2V0IGZhaWxlZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xyXG5cclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LDI1NSwwLDEpJztcclxuICAgICAgICBjdHgucmVjdCgoUC54ICsgMC41KSAqIHRoaXMucmVjdF93LCAoUC55ICsgMC41KSAqIHRoaXMucmVjdF9oLCB0aGlzLnJlY3RfdywgdGhpcy5yZWN0X2gpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eVq+WHunV26bueXHJcbiAgICBkcmF3UG9pbnRCeVJlY3RVVihQOiBWZWN0b3IyRCwgcmVjdFVWOiBWZWN0b3IyRCkge1xyXG4gICAgICAgIGxldCBjdHggPSBDYXZuYXNIZWxwZXIuZ2V0X2NvbnRleHQoJ2NhbnZhcycpO1xyXG4gICAgICAgIGlmICghY3R4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdHggZ2V0IGZhaWxlZCcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xyXG5cclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMjU1LDAsMSknO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0UCA9IG5ldyBWZWN0b3IyRCgoUC54ICsgMC41KSAqIHRoaXMucmVjdF93ICsgdGhpcy5yZWN0X3cgKiByZWN0VVYueCwgKFAueSArIDAuNSkgKiB0aGlzLnJlY3RfaCArIHRoaXMucmVjdF9oICogcmVjdFVWLnkpO1xyXG4gICAgICAgIGxldCByID0gNjtcclxuICAgICAgICBjdHguZmlsbFJlY3QodGFyZ2V0UC54IC0gMC41ICogciwgdGFyZ2V0UC55IC0gMC41ICogciwgciwgcik7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgVGVzdFRleHR1cmVBcHAoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Materails/Diffuse.ts":
/*!**********************************!*\
  !*** ./src/Materails/Diffuse.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math/Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Math_Tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Math/Tool */ "./src/Math/Tool.ts");


var Diffuse = /** @class */ (function () {
    function Diffuse(color) {
        this.color = color;
    }
    Diffuse.prototype.shading = function (hit_info, direction_light_dir, obj_list, depth) {
        var n = hit_info.normal;
        var strength = (0,_Math_Tool__WEBPACK_IMPORTED_MODULE_1__.clamp)(-_Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(direction_light_dir, n), 0, 1);
        var shadow_weight = (0,_Math_Tool__WEBPACK_IMPORTED_MODULE_1__.get_shadow_weight)(hit_info, direction_light_dir, obj_list);
        return this.color.multiply(strength).multiply(shadow_weight);
    };
    Diffuse.yellow = new Diffuse(new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 1, 0));
    Diffuse.red = new Diffuse(new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0, 0));
    Diffuse.green = new Diffuse(new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1, 0));
    Diffuse.blue = new Diffuse(new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 1));
    Diffuse.gray = new Diffuse(new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0.5, 0.5, 0.5));
    Diffuse.white = new Diffuse(new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 1, 1));
    return Diffuse;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Diffuse);


/***/ }),

/***/ "./src/Materails/Mirror.ts":
/*!*********************************!*\
  !*** ./src/Materails/Mirror.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math/Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Math_Tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Math/Tool */ "./src/Math/Tool.ts");
/* harmony import */ var _Math_Ray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Math/Ray */ "./src/Math/Ray.ts");
/* harmony import */ var _Diffuse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Diffuse */ "./src/Materails/Diffuse.ts");




var Mirror = /** @class */ (function () {
    function Mirror() {
    }
    Mirror.prototype.shading = function (hit_info, direction_light_dir, obj_list, depth) {
        if (depth > 20) {
            console.log('超過上限');
            return _Diffuse__WEBPACK_IMPORTED_MODULE_3__["default"].green.color;
        }
        var n = hit_info.normal;
        var i = hit_info.i;
        var r = _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].reflect(i, n);
        // 產生反射ray
        var from = hit_info.hit_pos.add(r.multiply(_Math_Tool__WEBPACK_IMPORTED_MODULE_1__.epsilon)); // 偏移一小段距離，避免射中自己
        var ray = new _Math_Ray__WEBPACK_IMPORTED_MODULE_2__["default"](from, r);
        var hit_sort_list = (0,_Math_Tool__WEBPACK_IMPORTED_MODULE_1__.get_hit_sort_list)(obj_list, ray);
        var color = new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 1, 1);
        // 有射中嗎
        var is_hit = hit_sort_list.length != 0;
        if (is_hit) {
            var hit_info_next = hit_sort_list[0];
            var hit_color = hit_info_next.s ? hit_info_next.s.shading(hit_info_next, direction_light_dir, obj_list, ++depth) : new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0, 0);
            return _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].multiply3(color, hit_color.multiply(0.9));
        }
        else {
            return _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].multiply3(color, _Diffuse__WEBPACK_IMPORTED_MODULE_3__["default"].gray.color.multiply(0.9));
        }
    };
    return Mirror;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mirror);


/***/ }),

/***/ "./src/Math/Camera.ts":
/*!****************************!*\
  !*** ./src/Math/Camera.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Ray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ray */ "./src/Math/Ray.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");
/* harmony import */ var _Materails_Diffuse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Materails/Diffuse */ "./src/Materails/Diffuse.ts");




var Camera = /** @class */ (function () {
    function Camera(eye, look_at, fov_degree, screenW, screenH, N, F) {
        this.ratio = screenW / screenH;
        this.screenW = screenW;
        this.screenH = screenH;
        this.screenCenterX = this.screenW * 0.5;
        this.screenCenterY = this.screenH * 0.5;
        this.halfW = this.screenW * 0.5;
        this.halfH = this.screenH * 0.5;
        // camera 3軸
        this.z_axis = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].minus(look_at, eye).normalize();
        // 左手
        var help_v = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].up;
        this.x_axis = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].cross(help_v, this.z_axis).normalize();
        this.y_axis = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].cross(this.z_axis, this.x_axis);
        // camera 原點
        this.eye = eye;
        // camera fov
        this.fov_degree = fov_degree;
        // 視錐的 近平面和遠平面
        this.N = N;
        this.F = F;
        // https://gpnnotes.blogspot.com/2021/11/blog-post_27.html
        // 投影矩陣對z的修正，這裡使用左手
        this.a = F / (F - N);
        this.b = -N * F / (F - N);
        console.log(this.a, this.b);
    }
    Camera.prototype.moveEye = function (s, A) {
        this.eye = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].add(this.eye, A.multiply(s));
    };
    Camera.prototype.addPitch = function (degree) {
        // todo: 乘上local matrix
    };
    Camera.prototype.addYaw = function (degree) {
        // todo: 乘上local matrix
    };
    Camera.prototype.create_ray_dir = function (x_weight, y_weight, ratio) {
        var half_fov_rad = (0,_Tool__WEBPACK_IMPORTED_MODULE_2__.degree_to_Rad)(0.5 * this.fov_degree);
        var tan_h = Math.tan(half_fov_rad);
        var tan_w = tan_h * ratio;
        var dir = this.z_axis
            .add(this.x_axis.multiply(x_weight * tan_w))
            .add(this.y_axis.multiply(y_weight * tan_h));
        return dir;
    };
    Camera.prototype.toCameraSpace = function (A) {
        var diff = A.minus(this.eye);
        var point_in_camera_space = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(diff, this.x_axis), _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(diff, this.y_axis), _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(diff, this.z_axis));
        return point_in_camera_space;
    };
    Camera.prototype.toProjectionSpace = function (A) {
        var fov_rad = (0,_Tool__WEBPACK_IMPORTED_MODULE_2__.degree_to_Rad)(this.fov_degree);
        var half_fov = 0.5 * fov_rad;
        var y_scale = 1 / Math.tan(half_fov);
        var x_scale = 1 / (this.ratio * Math.tan(half_fov));
        return new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](A.x * x_scale, A.y * y_scale, A.z * this.a + this.b);
    };
    Camera.prototype.toNDC = function (A, w) {
        var s = 1 / w;
        return A.multiply(s);
    };
    Camera.prototype.toScreenSpace = function (NDC_A) {
        // 用座標變換來看待從NDC到Screen Space
        // NDC x軸在screen space 為(w/2,0)
        // NDC y軸在screen space 為(-h/2,0)
        var x = this.halfW * NDC_A.x + this.screenCenterX;
        var y = -this.halfH * NDC_A.y + this.screenCenterY;
        var temp = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, 0);
        return temp;
    };
    // 算圖
    Camera.prototype.render = function (render_target, obj_list) {
        var _this = this;
        var direction_light_dir = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, -1, 0).normalize();
        var half_pixel_offset = 0.5 / render_target.h;
        var multisample_diff = [
            { x: 0, y: 0 },
            { x: half_pixel_offset, y: half_pixel_offset },
            { x: -half_pixel_offset, y: half_pixel_offset },
            { x: -half_pixel_offset, y: -half_pixel_offset },
            { x: half_pixel_offset, y: -half_pixel_offset },
        ];
        render_target.render_pixel(function (x_weight, y_weight, ratio) {
            var ray_dir = _this.create_ray_dir(x_weight, y_weight, ratio);
            // 產生多條ray
            var rays = multisample_diff.map(function (diff) {
                // 對ray_dri作偏移
                var dir = ray_dir.add(_this.x_axis.multiply(diff.x)).add(_this.y_axis.multiply(diff.y));
                // 雖然和球、平面的hit計算不需要dir作normalize，但為了方便反射的計算還是作normalize
                return new _Ray__WEBPACK_IMPORTED_MODULE_1__["default"](_this.eye, dir.normalize());
            });
            // 每個ray都算color
            var colors = rays.map(function (ray) {
                var hit_sort_list = (0,_Tool__WEBPACK_IMPORTED_MODULE_2__.get_hit_sort_list)(obj_list, ray);
                // 有射中嗎
                var is_hit = hit_sort_list.length != 0;
                if (is_hit) {
                    var hit_info = hit_sort_list[0];
                    if (hit_info.s)
                        return hit_info.s.shading(hit_info, direction_light_dir, obj_list, 1);
                    else // 不可能到這裡
                        return _Materails_Diffuse__WEBPACK_IMPORTED_MODULE_3__["default"].red.color;
                }
                else {
                    return _Materails_Diffuse__WEBPACK_IMPORTED_MODULE_3__["default"].gray.color;
                }
            });
            // 取平均就有Antialiasing效果
            var count = multisample_diff.length;
            var final_color = colors.reduce(function (accumulator, current) { return accumulator.add(current); }, _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].zero).multiply(1 / count);
            return final_color;
        });
    };
    return Camera;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Camera);


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

/***/ "./src/Math/Rect.ts":
/*!**************************!*\
  !*** ./src/Math/Rect.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");

// 小方塊
var Rect = /** @class */ (function () {
    function Rect(plane, w, h) {
        this.plane = plane;
        this.w = w;
        this.h = h;
    }
    Rect.prototype.hit = function (ray, s) {
        var result = this.plane.hit(ray, s);
        if (result) {
            var hit_pos = result.hit_pos;
            var diff = hit_pos.minus(this.plane.C);
            // 避開相等的情況
            var help_v = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].equal(this.plane.N, _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].up) ? new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0, 0) : _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].up;
            var w_axis = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].cross(help_v, this.plane.N).normalize();
            var h_axis = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].cross(w_axis, this.plane.N);
            var w_value = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(diff, w_axis);
            var h_value = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(diff, h_axis);
            var is_hit = Math.abs(w_value) < this.w && Math.abs(h_value) < this.h;
            if (is_hit)
                return result;
            else
                return null;
        }
        else {
            return null;
        }
    };
    return Rect;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ "./src/Math/RenderTarget.ts":
/*!**********************************!*\
  !*** ./src/Math/RenderTarget.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var RenderTarget = /** @class */ (function () {
    function RenderTarget(w, h) {
        if (w === void 0) { w = 320; }
        if (h === void 0) { h = 240; }
        this.w = 320;
        this.h = 240;
        this.w = w;
        this.h = h;
        this.backbuffer = new OffscreenCanvas(this.w, this.h);
    }
    RenderTarget.prototype.render_pixel = function (func) {
        var context_2d = this.backbuffer.getContext('2d');
        if (!context_2d) {
            console.log('get context failed');
            return;
        }
        // get source data array
        var backbuffer_data = context_2d.getImageData(0, 0, this.w, this.h);
        var backbuffer_data_array = backbuffer_data.data;
        var ratio = this.w / this.h;
        // set array value
        for (var y = 0; y < this.h; ++y) {
            for (var x = 0; x < this.w; ++x) {
                // rgba each color is 4byte
                var index = 4 * (x + y * this.w);
                // http://www.intro-to-dxr.cwyman.org/presentations/IntroDXR_RaytracingShaders.pdf
                // page 78
                // 需要偏移半個像素的長度，才會落在像素的中間(不過肉眼看不太出差別就是了)
                // remap to 0~1
                var X = ((x + 0.5) / this.w);
                var Y = ((y + 0.5) / this.h);
                // change y direction
                Y = 1 - Y;
                // remap to -1~1
                var x_weight = X * 2 - 1;
                var y_weight = Y * 2 - 1;
                var color = func(x_weight, y_weight, ratio);
                var r = color.x;
                var g = color.y;
                var b = color.z;
                // gamma校正
                var gamma = 1 / 2.1;
                r = Math.pow(r, gamma);
                g = Math.pow(g, gamma);
                b = Math.pow(b, gamma);
                backbuffer_data_array[index++] = Math.round(r * 255);
                backbuffer_data_array[index++] = Math.round(g * 255);
                backbuffer_data_array[index++] = Math.round(b * 255);
                backbuffer_data_array[index] = 255;
            }
        }
        context_2d.putImageData(backbuffer_data, 0, 0);
    };
    RenderTarget.prototype.set_pixel = function (func) {
        var context_2d = this.backbuffer.getContext('2d');
        if (!context_2d) {
            console.log('get context failed');
            return;
        }
        // get source data array
        var backbuffer_data = context_2d.getImageData(0, 0, this.w, this.h);
        var backbuffer_data_array = backbuffer_data.data;
        var ratio = this.w / this.h;
        // set array value
        for (var y = 0; y < this.h; ++y) {
            for (var x = 0; x < this.w; ++x) {
                // rgba each color is 4byte
                var index = 4 * (x + y * this.w);
                var color = func(x, y);
                var r = color.r;
                var g = color.g;
                var b = color.b;
                // 沒去gamma，也不用gamma校正
                // let gamma = 1 / 2.1;
                // r = Math.pow(r, gamma);
                // g = Math.pow(g, gamma);
                // b = Math.pow(b, gamma);
                backbuffer_data_array[index++] = Math.round(r * 255);
                backbuffer_data_array[index++] = Math.round(g * 255);
                backbuffer_data_array[index++] = Math.round(b * 255);
                backbuffer_data_array[index] = 255;
            }
        }
        context_2d.putImageData(backbuffer_data, 0, 0);
    };
    RenderTarget.prototype.show_buffer = function (canvas_id) {
        // 設定buffer的大小和css style的大小一樣
        // https://openhome.cc/Gossip/WebGL/Canvas.html
        var canvas = document.getElementById(canvas_id);
        canvas.style.width = this.w + 'px';
        canvas.style.height = this.h + 'px';
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        // copy backbuffer to canvas
        var context_bitmap_render = canvas.getContext("bitmaprenderer");
        if (!context_bitmap_render) {
            console.log('get context_bitmap_render failed');
            return;
        }
        context_bitmap_render.transferFromImageBitmap(this.backbuffer.transferToImageBitmap());
    };
    return RenderTarget;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RenderTarget);


/***/ }),

/***/ "./src/Math/Sphere.ts":
/*!****************************!*\
  !*** ./src/Math/Sphere.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tool */ "./src/Math/Tool.ts");


var Sphere = /** @class */ (function () {
    function Sphere(C, R) {
        this.C = C;
        this.R = R;
    }
    Sphere.prototype.hit = function (ray, s) {
        // 解2次方程式
        // (X-C)。(X-C) = R*R
        // X=F+t*D
        // t=[(-b-sqrt_k)/2a,(-b+sqrt_k)/2a]
        var D = ray.dir;
        var F = ray.from;
        var a = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(D, D);
        var b = 2 * (_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(D, F) - _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(D, this.C));
        var c = _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(F, F) - 2 * _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(F, this.C) + _Vector__WEBPACK_IMPORTED_MODULE_0__["default"].dot(this.C, this.C) - this.R * this.R;
        var k = b * b - 4 * a * c;
        if ((0,_Tool__WEBPACK_IMPORTED_MODULE_1__.number_equal)(k, 0)) { // 交於1點
            var t = -b / (2 * a);
            //擋掉
            if (t < 0) {
                return null;
            }
            var hit_pos = F.add(D.multiply(t));
            var normal = hit_pos.minus(this.C).normalize();
            return {
                positive_t: true,
                hit_pos: hit_pos,
                i: D,
                t: t,
                normal: normal,
                s: s
            };
        }
        else if (k > 0) { // 交於2點
            // 過濾出t>0
            // ray.from在球內有可能出現t<0
            // 球在ray的後面也可能出現t<0
            var sqrt_k = Math.sqrt(k);
            var t_list = [(-b - sqrt_k) / (2 * a), (-b + sqrt_k) / (2 * a)].filter(function (x) { return x > 0; });
            // 都是負值
            if (t_list.length == 0) {
                return null;
            }
            var t = t_list[0];
            var hit_pos = F.add(D.multiply(t));
            var normal = hit_pos.minus(this.C).normalize();
            return {
                positive_t: true,
                hit_pos: hit_pos,
                i: D,
                t: t,
                normal: normal,
                s: s
            };
        }
        else { // 沒交點
            return null;
        }
    };
    return Sphere;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sphere);


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


/***/ }),

/***/ "./src/Object/SceneNode.ts":
/*!*********************************!*\
  !*** ./src/Object/SceneNode.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var SceneNode = /** @class */ (function () {
    function SceneNode(s, h) {
        this.s = s;
        this.h = h;
    }
    return SceneNode;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SceneNode);


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
/*!***********************************!*\
  !*** ./src/WhiteRayTracingApp.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Math_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/Vector */ "./src/Math/Vector.ts");
/* harmony import */ var _Math_Camera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/Camera */ "./src/Math/Camera.ts");
/* harmony import */ var _Math_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math/Rect */ "./src/Math/Rect.ts");
/* harmony import */ var _Math_Plane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Math/Plane */ "./src/Math/Plane.ts");
/* harmony import */ var _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Math/Sphere */ "./src/Math/Sphere.ts");
/* harmony import */ var _Math_RenderTarget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Math/RenderTarget */ "./src/Math/RenderTarget.ts");
/* harmony import */ var _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Object/SceneNode */ "./src/Object/SceneNode.ts");
/* harmony import */ var _Materails_Diffuse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Materails/Diffuse */ "./src/Materails/Diffuse.ts");
/* harmony import */ var _Materails_Mirror__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Materails/Mirror */ "./src/Materails/Mirror.ts");









var WhiteRayTracingApp = /** @class */ (function () {
    function WhiteRayTracingApp() {
        var floor = new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](_Materails_Diffuse__WEBPACK_IMPORTED_MODULE_7__["default"].white, new _Math_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](new _Math_Plane__WEBPACK_IMPORTED_MODULE_3__["default"](_Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].zero, _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].up), 16, 16));
        var obj_list = [floor];
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](_Materails_Diffuse__WEBPACK_IMPORTED_MODULE_7__["default"].yellow, new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](6, 2, -8), 2)));
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](_Materails_Diffuse__WEBPACK_IMPORTED_MODULE_7__["default"].green, new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](-6, 2, -8), 2)));
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](_Materails_Diffuse__WEBPACK_IMPORTED_MODULE_7__["default"].blue, new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 2, -12), 2)));
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](_Materails_Diffuse__WEBPACK_IMPORTED_MODULE_7__["default"].yellow, new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](-10, 6, 0), 6)));
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](new _Materails_Mirror__WEBPACK_IMPORTED_MODULE_8__["default"](), new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 2, -2), 2)));
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](new _Materails_Mirror__WEBPACK_IMPORTED_MODULE_8__["default"](), new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](12, 4, -6), 4)));
        obj_list.push(new _Object_SceneNode__WEBPACK_IMPORTED_MODULE_6__["default"](new _Materails_Mirror__WEBPACK_IMPORTED_MODULE_8__["default"](), new _Math_Sphere__WEBPACK_IMPORTED_MODULE_4__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](8, 4, 2), 4)));
        var SW = 800;
        var SH = 600;
        var camera = new _Math_Camera__WEBPACK_IMPORTED_MODULE_1__["default"](new _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 20, -20), _Math_Vector__WEBPACK_IMPORTED_MODULE_0__["default"].zero, 60, SW, SH, 1, 500);
        var render_target = new _Math_RenderTarget__WEBPACK_IMPORTED_MODULE_5__["default"](SW, SH);
        camera.render(render_target, obj_list);
        render_target.show_buffer('canvas');
    }
    return WhiteRayTracingApp;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WhiteRayTracingApp);
new WhiteRayTracingApp();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2QyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUM7O0FBRUQsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRlcmFpbHMvRGlmZnVzZS50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL01hdGVyYWlscy9NaXJyb3IudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL0NhbWVyYS50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL01hdGgvUGxhbmUudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1JHQkEudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1Jhc3Rlcml6ZXIudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1JheS50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL01hdGgvUmF5NEQudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1JlY3QudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1JlbmRlclRhcmdldC50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL01hdGgvU3BoZXJlLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9Ub29sLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9UcmFuc2Zvcm0udHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1RyaWFuZ2xlLnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9NYXRoL1ZlY3RvcjJELnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvTWF0aC9WZWN0b3I0RC50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0Ly4vc3JjL01hdGgvVmVydGV4LnRzIiwid2VicGFjazovL3dlYmdsX3Rlc3QvLi9zcmMvT2JqZWN0L1NjZW5lTm9kZS50cyIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmdsX3Rlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYmdsX3Rlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJnbF90ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViZ2xfdGVzdC8uL3NyYy9XaGl0ZVJheVRyYWNpbmdBcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vTWF0aC9WZWN0b3JcIjtcclxuaW1wb3J0IEhpdEluZm8gZnJvbSBcIi4uL01hdGgvSGl0SW5mb1wiO1xyXG5pbXBvcnQgeyBjbGFtcCwgZ2V0X3NoYWRvd193ZWlnaHQgfSBmcm9tIFwiLi4vTWF0aC9Ub29sXCI7XHJcbmltcG9ydCBTaGFkZXIgZnJvbSBcIi4vU2hhZGVyXCI7XHJcbmltcG9ydCBTY2VuZU5vZGUgZnJvbSBcIi4uL09iamVjdC9TY2VuZU5vZGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZmZ1c2UgaW1wbGVtZW50cyBTaGFkZXIge1xyXG4gICAgc3RhdGljIHllbGxvdyA9IG5ldyBEaWZmdXNlKG5ldyBWZWN0b3IoMSwgMSwgMCkpO1xyXG4gICAgc3RhdGljIHJlZCA9IG5ldyBEaWZmdXNlKG5ldyBWZWN0b3IoMSwgMCwgMCkpO1xyXG4gICAgc3RhdGljIGdyZWVuID0gbmV3IERpZmZ1c2UobmV3IFZlY3RvcigwLCAxLCAwKSk7XHJcbiAgICBzdGF0aWMgYmx1ZSA9IG5ldyBEaWZmdXNlKG5ldyBWZWN0b3IoMCwgMCwgMSkpO1xyXG4gICAgc3RhdGljIGdyYXkgPSBuZXcgRGlmZnVzZShuZXcgVmVjdG9yKDAuNSwgMC41LCAwLjUpKTtcclxuICAgIHN0YXRpYyB3aGl0ZSA9IG5ldyBEaWZmdXNlKG5ldyBWZWN0b3IoMSwgMSwgMSkpO1xyXG5cclxuICAgIGNvbG9yOiBWZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xvcjogVmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHNoYWRpbmcoaGl0X2luZm86IEhpdEluZm8sIGRpcmVjdGlvbl9saWdodF9kaXI6IFZlY3Rvciwgb2JqX2xpc3Q6IFNjZW5lTm9kZVtdLCBkZXB0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG4gPSBoaXRfaW5mby5ub3JtYWw7XHJcbiAgICAgICAgbGV0IHN0cmVuZ3RoID0gY2xhbXAoLVZlY3Rvci5kb3QoZGlyZWN0aW9uX2xpZ2h0X2RpciwgbiksIDAsIDEpO1xyXG5cclxuICAgICAgICBsZXQgc2hhZG93X3dlaWdodCA9IGdldF9zaGFkb3dfd2VpZ2h0KGhpdF9pbmZvLCBkaXJlY3Rpb25fbGlnaHRfZGlyLCBvYmpfbGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3IubXVsdGlwbHkoc3RyZW5ndGgpLm11bHRpcGx5KHNoYWRvd193ZWlnaHQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNoYWRlciBmcm9tIFwiLi9TaGFkZXJcIjtcclxuaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vTWF0aC9WZWN0b3JcIjtcclxuaW1wb3J0IEhpdEluZm8gZnJvbSBcIi4uL01hdGgvSGl0SW5mb1wiO1xyXG5pbXBvcnQgeyBlcHNpbG9uLCBnZXRfaGl0X3NvcnRfbGlzdCB9IGZyb20gXCIuLi9NYXRoL1Rvb2xcIlxyXG5pbXBvcnQgUmF5IGZyb20gXCIuLi9NYXRoL1JheVwiO1xyXG5pbXBvcnQgU2NlbmVOb2RlIGZyb20gXCIuLi9PYmplY3QvU2NlbmVOb2RlXCI7XHJcbmltcG9ydCBEaWZmdXNlIGZyb20gXCIuL0RpZmZ1c2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pcnJvciBpbXBsZW1lbnRzIFNoYWRlciB7XHJcbiAgICBzaGFkaW5nKGhpdF9pbmZvOiBIaXRJbmZvLCBkaXJlY3Rpb25fbGlnaHRfZGlyOiBWZWN0b3IsIG9ial9saXN0OiBTY2VuZU5vZGVbXSwgZGVwdGg6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAoZGVwdGggPiAyMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6LaF6YGO5LiK6ZmQJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBEaWZmdXNlLmdyZWVuLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbiA9IGhpdF9pbmZvLm5vcm1hbDtcclxuICAgICAgICBsZXQgaSA9IGhpdF9pbmZvLmk7XHJcbiAgICAgICAgbGV0IHIgPSBWZWN0b3IucmVmbGVjdChpLCBuKTtcclxuXHJcbiAgICAgICAgLy8g55Si55Sf5Y+N5bCEcmF5XHJcbiAgICAgICAgbGV0IGZyb20gPSBoaXRfaW5mby5oaXRfcG9zLmFkZChyLm11bHRpcGx5KGVwc2lsb24pKTsgLy8g5YGP56e75LiA5bCP5q616Led6Zui77yM6YG/5YWN5bCE5Lit6Ieq5bexXHJcbiAgICAgICAgbGV0IHJheSA9IG5ldyBSYXkoZnJvbSwgcik7XHJcbiAgICAgICAgbGV0IGhpdF9zb3J0X2xpc3QgPSBnZXRfaGl0X3NvcnRfbGlzdChvYmpfbGlzdCwgcmF5KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gbmV3IFZlY3RvcigxLCAxLCAxKTtcclxuICAgICAgICAvLyDmnInlsITkuK3ll45cclxuICAgICAgICBsZXQgaXNfaGl0ID0gaGl0X3NvcnRfbGlzdC5sZW5ndGggIT0gMDtcclxuICAgICAgICBpZiAoaXNfaGl0KSB7XHJcbiAgICAgICAgICAgIGxldCBoaXRfaW5mb19uZXh0ID0gaGl0X3NvcnRfbGlzdFswXTtcclxuICAgICAgICAgICAgbGV0IGhpdF9jb2xvciA9IGhpdF9pbmZvX25leHQucyA/IGhpdF9pbmZvX25leHQucy5zaGFkaW5nKGhpdF9pbmZvX25leHQsIGRpcmVjdGlvbl9saWdodF9kaXIsIG9ial9saXN0LCArK2RlcHRoKSA6IG5ldyBWZWN0b3IoMSwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IubXVsdGlwbHkzKGNvbG9yLCBoaXRfY29sb3IubXVsdGlwbHkoMC45KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFZlY3Rvci5tdWx0aXBseTMoY29sb3IsIERpZmZ1c2UuZ3JheS5jb2xvci5tdWx0aXBseSgwLjkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgUmF5IGZyb20gXCIuL1JheVwiO1xyXG5pbXBvcnQgeyBkZWdyZWVfdG9fUmFkLCBnZXRfaGl0X3NvcnRfbGlzdCB9IGZyb20gXCIuL1Rvb2xcIlxyXG5pbXBvcnQgUmVuZGVyVGFyZ2V0IGZyb20gXCIuL1JlbmRlclRhcmdldFwiO1xyXG5pbXBvcnQgU2NlbmVOb2RlIGZyb20gXCIuLi9PYmplY3QvU2NlbmVOb2RlXCI7XHJcbmltcG9ydCBEaWZmdXNlIGZyb20gXCIuLi9NYXRlcmFpbHMvRGlmZnVzZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XHJcbiAgICBleWU6IFZlY3RvcjtcclxuXHJcbiAgICB4X2F4aXM6IFZlY3RvcjtcclxuICAgIHlfYXhpczogVmVjdG9yO1xyXG4gICAgel9heGlzOiBWZWN0b3I7XHJcblxyXG4gICAgcmF0aW86IG51bWJlcjtcclxuXHJcbiAgICBzY3JlZW5XOiBudW1iZXI7XHJcbiAgICBzY3JlZW5IOiBudW1iZXI7XHJcblxyXG4gICAgc2NyZWVuQ2VudGVyWDogbnVtYmVyO1xyXG4gICAgc2NyZWVuQ2VudGVyWTogbnVtYmVyO1xyXG4gICAgaGFsZlc6IG51bWJlcjtcclxuICAgIGhhbGZIOiBudW1iZXI7XHJcblxyXG4gICAgLy8g6KaW6YyQ55qEIOi/keW5s+mdouWSjOmBoOW5s+mdolxyXG4gICAgLy8gYeOAgWLlkozmipXlvbHnn6npmaPmnInpl5xcclxuICAgIE46IG51bWJlcjtcclxuICAgIEY6IG51bWJlcjtcclxuICAgIGE6IG51bWJlcjtcclxuICAgIGI6IG51bWJlcjtcclxuXHJcbiAgICBmb3ZfZGVncmVlOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihleWU6IFZlY3RvciwgbG9va19hdDogVmVjdG9yLCBmb3ZfZGVncmVlOiBudW1iZXIsIHNjcmVlblc6IG51bWJlciwgc2NyZWVuSDogbnVtYmVyLCBOOiBudW1iZXIsIEY6IG51bWJlcikge1xyXG5cclxuICAgICAgICB0aGlzLnJhdGlvID0gc2NyZWVuVyAvIHNjcmVlbkg7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5XID0gc2NyZWVuVztcclxuICAgICAgICB0aGlzLnNjcmVlbkggPSBzY3JlZW5IO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuQ2VudGVyWCA9IHRoaXMuc2NyZWVuVyAqIDAuNTtcclxuICAgICAgICB0aGlzLnNjcmVlbkNlbnRlclkgPSB0aGlzLnNjcmVlbkggKiAwLjU7XHJcbiAgICAgICAgdGhpcy5oYWxmVyA9IHRoaXMuc2NyZWVuVyAqIDAuNTtcclxuICAgICAgICB0aGlzLmhhbGZIID0gdGhpcy5zY3JlZW5IICogMC41O1xyXG5cclxuICAgICAgICAvLyBjYW1lcmEgM+i7uFxyXG4gICAgICAgIHRoaXMuel9heGlzID0gVmVjdG9yLm1pbnVzKGxvb2tfYXQsIGV5ZSkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgIC8vIOW3puaJi1xyXG4gICAgICAgIGxldCBoZWxwX3YgPSBWZWN0b3IudXA7XHJcbiAgICAgICAgdGhpcy54X2F4aXMgPSBWZWN0b3IuY3Jvc3MoaGVscF92LCB0aGlzLnpfYXhpcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy55X2F4aXMgPSBWZWN0b3IuY3Jvc3ModGhpcy56X2F4aXMsIHRoaXMueF9heGlzKTtcclxuXHJcbiAgICAgICAgLy8gY2FtZXJhIOWOn+m7nlxyXG4gICAgICAgIHRoaXMuZXllID0gZXllO1xyXG5cclxuICAgICAgICAvLyBjYW1lcmEgZm92XHJcbiAgICAgICAgdGhpcy5mb3ZfZGVncmVlID0gZm92X2RlZ3JlZTtcclxuXHJcbiAgICAgICAgLy8g6KaW6YyQ55qEIOi/keW5s+mdouWSjOmBoOW5s+mdolxyXG4gICAgICAgIHRoaXMuTiA9IE47XHJcbiAgICAgICAgdGhpcy5GID0gRjtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjcuaHRtbFxyXG4gICAgICAgIC8vIOaKleW9seefqemZo+WwjXrnmoTkv67mraPvvIzpgJnoo6Hkvb/nlKjlt6bmiYtcclxuICAgICAgICB0aGlzLmEgPSBGIC8gKEYgLSBOKTtcclxuICAgICAgICB0aGlzLmIgPSAtTiAqIEYgLyAoRiAtIE4pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmEsIHRoaXMuYik7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUV5ZShzOiBudW1iZXIsIEE6IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuZXllID0gVmVjdG9yLmFkZCh0aGlzLmV5ZSwgQS5tdWx0aXBseShzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUGl0Y2goZGVncmVlOiBudW1iZXIpIHtcclxuICAgICAgICAvLyB0b2RvOiDkuZjkuIpsb2NhbCBtYXRyaXhcclxuICAgIH1cclxuXHJcbiAgICBhZGRZYXcoZGVncmVlOiBudW1iZXIpIHtcclxuICAgICAgICAvLyB0b2RvOiDkuZjkuIpsb2NhbCBtYXRyaXhcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVfcmF5X2Rpcih4X3dlaWdodDogbnVtYmVyLCB5X3dlaWdodDogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGhhbGZfZm92X3JhZCA9IGRlZ3JlZV90b19SYWQoMC41ICogdGhpcy5mb3ZfZGVncmVlKTtcclxuICAgICAgICBsZXQgdGFuX2ggPSBNYXRoLnRhbihoYWxmX2Zvdl9yYWQpO1xyXG4gICAgICAgIGxldCB0YW5fdyA9IHRhbl9oICogcmF0aW87XHJcblxyXG4gICAgICAgIGxldCBkaXIgPSB0aGlzLnpfYXhpc1xyXG4gICAgICAgICAgICAuYWRkKHRoaXMueF9heGlzLm11bHRpcGx5KHhfd2VpZ2h0ICogdGFuX3cpKVxyXG4gICAgICAgICAgICAuYWRkKHRoaXMueV9heGlzLm11bHRpcGx5KHlfd2VpZ2h0ICogdGFuX2gpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcjtcclxuICAgIH1cclxuXHJcbiAgICB0b0NhbWVyYVNwYWNlKEE6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCBkaWZmID0gQS5taW51cyh0aGlzLmV5ZSk7XHJcbiAgICAgICAgbGV0IHBvaW50X2luX2NhbWVyYV9zcGFjZSA9IG5ldyBWZWN0b3IoVmVjdG9yLmRvdChkaWZmLCB0aGlzLnhfYXhpcyksIFZlY3Rvci5kb3QoZGlmZiwgdGhpcy55X2F4aXMpLCBWZWN0b3IuZG90KGRpZmYsIHRoaXMuel9heGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIHBvaW50X2luX2NhbWVyYV9zcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICB0b1Byb2plY3Rpb25TcGFjZShBOiBWZWN0b3IpIHtcclxuICAgICAgICBsZXQgZm92X3JhZCA9IGRlZ3JlZV90b19SYWQodGhpcy5mb3ZfZGVncmVlKTtcclxuICAgICAgICBsZXQgaGFsZl9mb3YgPSAwLjUgKiBmb3ZfcmFkO1xyXG4gICAgICAgIGxldCB5X3NjYWxlID0gMSAvIE1hdGgudGFuKGhhbGZfZm92KTtcclxuICAgICAgICBsZXQgeF9zY2FsZSA9IDEgLyAodGhpcy5yYXRpbyAqIE1hdGgudGFuKGhhbGZfZm92KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKEEueCAqIHhfc2NhbGUsIEEueSAqIHlfc2NhbGUsIEEueiAqIHRoaXMuYSArIHRoaXMuYik7XHJcbiAgICB9XHJcblxyXG4gICAgdG9OREMoQTogVmVjdG9yLCB3OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcyA9IDEgLyB3O1xyXG4gICAgICAgIHJldHVybiBBLm11bHRpcGx5KHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU2NyZWVuU3BhY2UoTkRDX0E6IFZlY3Rvcikge1xyXG4gICAgICAgIC8vIOeUqOW6p+aomeiuiuaPm+S+hueci+W+heW+nk5EQ+WIsFNjcmVlbiBTcGFjZVxyXG4gICAgICAgIC8vIE5EQyB46Lu45Zyoc2NyZWVuIHNwYWNlIOeCuih3LzIsMClcclxuICAgICAgICAvLyBOREMgeei7uOWcqHNjcmVlbiBzcGFjZSDngrooLWgvMiwwKVxyXG4gICAgICAgIGxldCB4ID0gdGhpcy5oYWxmVyAqIE5EQ19BLnggKyB0aGlzLnNjcmVlbkNlbnRlclg7XHJcbiAgICAgICAgbGV0IHkgPSAtdGhpcy5oYWxmSCAqIE5EQ19BLnkgKyB0aGlzLnNjcmVlbkNlbnRlclk7XHJcblxyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3Rvcih4LCB5LCAwKTtcclxuICAgICAgICByZXR1cm4gdGVtcDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnrpflnJZcclxuICAgIHJlbmRlcihyZW5kZXJfdGFyZ2V0OiBSZW5kZXJUYXJnZXQsIG9ial9saXN0OiBTY2VuZU5vZGVbXSkge1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25fbGlnaHRfZGlyID0gbmV3IFZlY3RvcigxLCAtMSwgMCkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgIGxldCBoYWxmX3BpeGVsX29mZnNldCA9IDAuNSAvIHJlbmRlcl90YXJnZXQuaDtcclxuICAgICAgICBsZXQgbXVsdGlzYW1wbGVfZGlmZiA9IFtcclxuICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgICAgIHsgeDogaGFsZl9waXhlbF9vZmZzZXQsIHk6IGhhbGZfcGl4ZWxfb2Zmc2V0IH0sXHJcbiAgICAgICAgICAgIHsgeDogLWhhbGZfcGl4ZWxfb2Zmc2V0LCB5OiBoYWxmX3BpeGVsX29mZnNldCB9LFxyXG4gICAgICAgICAgICB7IHg6IC1oYWxmX3BpeGVsX29mZnNldCwgeTogLWhhbGZfcGl4ZWxfb2Zmc2V0IH0sXHJcbiAgICAgICAgICAgIHsgeDogaGFsZl9waXhlbF9vZmZzZXQsIHk6IC1oYWxmX3BpeGVsX29mZnNldCB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJlbmRlcl90YXJnZXQucmVuZGVyX3BpeGVsKCh4X3dlaWdodDogbnVtYmVyLCB5X3dlaWdodDogbnVtYmVyLCByYXRpbzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByYXlfZGlyID0gdGhpcy5jcmVhdGVfcmF5X2Rpcih4X3dlaWdodCwgeV93ZWlnaHQsIHJhdGlvKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOeUoueUn+WkmuainXJheVxyXG4gICAgICAgICAgICBsZXQgcmF5cyA9IG11bHRpc2FtcGxlX2RpZmYubWFwKGRpZmYgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5bCNcmF5X2RyaeS9nOWBj+enu1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IHJheV9kaXIuYWRkKHRoaXMueF9heGlzLm11bHRpcGx5KGRpZmYueCkpLmFkZCh0aGlzLnlfYXhpcy5tdWx0aXBseShkaWZmLnkpKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOmblueEtuWSjOeQg+OAgeW5s+mdoueahGhpdOioiOeul+S4jemcgOimgWRpcuS9nG5vcm1hbGl6Ze+8jOS9hueCuuS6huaWueS+v+WPjeWwhOeahOioiOeul+mChOaYr+S9nG5vcm1hbGl6ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYXkodGhpcy5leWUsIGRpci5ub3JtYWxpemUoKSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDmr4/lgItyYXnpg73nrpdjb2xvclxyXG4gICAgICAgICAgICBsZXQgY29sb3JzID0gcmF5cy5tYXAocmF5ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoaXRfc29ydF9saXN0ID0gZ2V0X2hpdF9zb3J0X2xpc3Qob2JqX2xpc3QsIHJheSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5pyJ5bCE5Lit5ZeOXHJcbiAgICAgICAgICAgICAgICBsZXQgaXNfaGl0ID0gaGl0X3NvcnRfbGlzdC5sZW5ndGggIT0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpc19oaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGl0X2luZm8gPSBoaXRfc29ydF9saXN0WzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGl0X2luZm8ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhpdF9pbmZvLnMuc2hhZGluZyhoaXRfaW5mbywgZGlyZWN0aW9uX2xpZ2h0X2Rpciwgb2JqX2xpc3QsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgLy8g5LiN5Y+v6IO95Yiw6YCZ6KOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEaWZmdXNlLnJlZC5jb2xvcjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERpZmZ1c2UuZ3JheS5jb2xvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDlj5blubPlnYflsLHmnIlBbnRpYWxpYXNpbmfmlYjmnpxcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gbXVsdGlzYW1wbGVfZGlmZi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbF9jb2xvciA9IGNvbG9ycy5yZWR1Y2UoKGFjY3VtdWxhdG9yOiBWZWN0b3IsIGN1cnJlbnQ6IFZlY3RvcikgPT4gYWNjdW11bGF0b3IuYWRkKGN1cnJlbnQpLCBWZWN0b3IuemVybykubXVsdGlwbHkoMSAvIGNvdW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmFsX2NvbG9yO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFJheSBmcm9tICcuL1JheSc7XHJcbmltcG9ydCB7IG51bWJlcl9lcXVhbCB9IGZyb20gJy4vVG9vbCc7XHJcbmltcG9ydCBIaXRJbmZvIGZyb20gJy4vSGl0SW5mbyc7XHJcbmltcG9ydCBIaXRhYmxlIGZyb20gJy4vSGl0YWJsZSc7XHJcbmltcG9ydCBTaGFkZXIgZnJvbSAnLi4vTWF0ZXJhaWxzL1NoYWRlcic7XHJcblxyXG4vLyDlubPpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhbmUgaW1wbGVtZW50cyBIaXRhYmxlIHtcclxuXHJcbiAgICBDOiBWZWN0b3I7XHJcbiAgICBOOiBWZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogVmVjdG9yLCBub3JtYWw6IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuQyA9IHBvaW50O1xyXG4gICAgICAgIHRoaXMuTiA9IG5vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmuKzoqaZ0ZXNwX3DlkozmlrnlkJHph4/mmK/kuI3mmK/lnKjlkIzkuIDpgopcclxuICAgIGlzX3Bvc2l0aXZlKHRlc3RfcDogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGRpZmYgPSBWZWN0b3IubWludXModGVzdF9wLCB0aGlzLkMpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IFZlY3Rvci5kb3QoZGlmZiwgdGhpcy5OKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhpdChyYXk6IFJheSwgczogU2hhZGVyKTogSGl0SW5mbyB8IG51bGwge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBQbGFuZS5oaXQocmF5LCB0aGlzKTtcclxuICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICByZXN1bHQucyA9IHM7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGl0KHJheTogUmF5LCBwbGFuZTogUGxhbmUpOiBIaXRJbmZvIHwgbnVsbCB7XHJcbiAgICAgICAgLy8gcmF5IGhpdCBwbGFuZSBcclxuICAgICAgICBsZXQgZnJvbSA9IHJheS5mcm9tO1xyXG4gICAgICAgIGxldCBkaXIgPSByYXkuZGlyO1xyXG5cclxuICAgICAgICAvLyAoRi1DKeOAgk4gKyB0IChE44CCTikgPSAwXHJcbiAgICAgICAgLy8gdCAgPSAoQy1GKeOAgk4gLyAoROOAgk4pXHJcbiAgICAgICAgLy8gdCAgPSAoQSAvIChCKVxyXG4gICAgICAgIGxldCBCID0gVmVjdG9yLmRvdChkaXIsIHBsYW5lLk4pO1xyXG4gICAgICAgIGxldCBBID0gVmVjdG9yLmRvdChWZWN0b3IubWludXMocGxhbmUuQywgZnJvbSksIHBsYW5lLk4pO1xyXG5cclxuICAgICAgICAvLyBhdm9pZCBkaXZpZGUgYnkgMFxyXG4gICAgICAgIGlmIChudW1iZXJfZXF1YWwoQiwgMCkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgdCA9IEEgLyBCO1xyXG4gICAgICAgIGxldCBwb3NpdGl2ZV90ID0gdCA+IDAuMDtcclxuICAgICAgICBsZXQgaGl0X3BvcyA9IGZyb20uYWRkKGRpci5tdWx0aXBseSh0KSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcG9zaXRpdmVfdCxcclxuICAgICAgICAgICAgaGl0X3BvcyxcclxuICAgICAgICAgICAgaTogZGlyLFxyXG4gICAgICAgICAgICB0LFxyXG4gICAgICAgICAgICBub3JtYWw6IHBsYW5lLk5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgeyBsZXJwIH0gZnJvbSBcIi4vVG9vbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUkdCQSB7XHJcbiAgICBzdGF0aWMgZGVidWcgPSBuZXcgUkdCQSgxLCAwLCAxLCAxKTtcclxuICAgIHN0YXRpYyBnb2xkZW4gPSBuZXcgUkdCQSgxLCAyMTUgLyAyNTUsIDAsIDEpO1xyXG4gICAgc3RhdGljIHllbGxvdyA9IG5ldyBSR0JBKDEsIDEsIDAsIDEpO1xyXG4gICAgc3RhdGljIHBpbmsgPSBuZXcgUkdCQSgxLCAxOTIgLyAyNTUsIDIwMyAvIDI1NSwgMSk7XHJcbiAgICBzdGF0aWMgYmxhY2sgPSBuZXcgUkdCQSgwLCAwLCAwLCAxKTtcclxuICAgIHN0YXRpYyByZWQgPSBuZXcgUkdCQSgxLCAwLCAwLCAxKTtcclxuXHJcbiAgICByOiBudW1iZXI7XHJcbiAgICBnOiBudW1iZXI7XHJcbiAgICBiOiBudW1iZXI7XHJcbiAgICBhOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnIgPSByO1xyXG4gICAgICAgIHRoaXMuZyA9IGc7XHJcbiAgICAgICAgdGhpcy5iID0gYjtcclxuICAgICAgICB0aGlzLmEgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsZXJwKEE6IFJHQkEsIEI6IFJHQkEsIGs6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUkdCQShcclxuICAgICAgICAgICAgbGVycChBLnIsIEIuciwgayksXHJcbiAgICAgICAgICAgIGxlcnAoQS5nLCBCLmcsIGspLFxyXG4gICAgICAgICAgICBsZXJwKEEuYiwgQi5iLCBrKSxcclxuICAgICAgICAgICAgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKEE6IFJHQkEpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJHQkEodGhpcy5yICsgQS5yLCB0aGlzLmcgKyBBLmcsIHRoaXMuYiArIEEuYiwgMSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG11bHRpcGx5KHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUkdCQSh0aGlzLnIgKiBzLCB0aGlzLmcgKiBzLCB0aGlzLmIgKiBzLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gXCIoIFwiICsgdGhpcy5yICsgXCIgLCBcIiArIHRoaXMuZyArIFwiICwgXCIgKyB0aGlzLmIgKyBcIiApXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVHJhbnNmb3JtIGZyb20gJy4vVHJhbnNmb3JtJztcclxuaW1wb3J0IFRyaWFuZ2xlIGZyb20gJy4vVHJpYW5nbGUnO1xyXG5pbXBvcnQgeyBDbGlwUGxhbmUsIGNsaXAgfSBmcm9tICcuL1Rvb2wnO1xyXG5pbXBvcnQgVmVydGV4IGZyb20gJy4vVmVydGV4JztcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQnVmZmVyMkQgZnJvbSBcIi4vQnVmZmVyMkRcIjtcclxuaW1wb3J0IFJHQkEgZnJvbSBcIi4vUkdCQVwiO1xyXG5pbXBvcnQgUmVuZGVyVGFyZ2V0IGZyb20gJy4vUmVuZGVyVGFyZ2V0JztcclxuaW1wb3J0IFRleHR1cmUyRCBmcm9tICcuL1RleHR1cmUyRCc7XHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuL1ZlY3RvcjJEJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhc3Rlcml6ZXIge1xyXG4gICAgc3RhdGljIGNvbG9yX2J1ZmZlcjogQnVmZmVyMkQ8UkdCQT47XHJcbiAgICBzdGF0aWMgel9idWZmZXI6IEJ1ZmZlcjJEPG51bWJlcj47XHJcblxyXG4gICAgc3RhdGljIGNsZWFyKGNvbG9yOiBSR0JBLCB6OiBudW1iZXIpIHtcclxuICAgICAgICBSYXN0ZXJpemVyLmNvbG9yX2J1ZmZlci5jbGVhcihjb2xvcik7XHJcbiAgICAgICAgUmFzdGVyaXplci56X2J1ZmZlci5jbGVhcih6KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2hvdyhyZW5kZXJfdGFyZ2V0OiBSZW5kZXJUYXJnZXQpIHtcclxuICAgICAgICByZW5kZXJfdGFyZ2V0LnNldF9waXhlbCgoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFJhc3Rlcml6ZXIuY29sb3JfYnVmZmVyLmdldCh4LCB5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZW5kZXJfdGFyZ2V0LnNob3dfYnVmZmVyKCdjYW52YXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xpcF9oZWxwZXIoaW5fbGlzdDogVHJpYW5nbGVbXSxcclxuICAgICAgICB2MF9vdXQ6ICh0cmlhbmdsZTogVHJpYW5nbGUpID0+IGJvb2xlYW4sXHJcbiAgICAgICAgdjFfb3V0OiAodHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiBib29sZWFuLFxyXG4gICAgICAgIHYyX291dDogKHRyaWFuZ2xlOiBUcmlhbmdsZSkgPT4gYm9vbGVhbixcclxuICAgICAgICBwbGFuZTogQ2xpcFBsYW5lKSB7XHJcblxyXG4gICAgICAgIGxldCBvdXRfbGlzdDogVHJpYW5nbGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFQgb2YgaW5fbGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gY2xpcChULCB2MF9vdXQsIHYxX291dCwgdjJfb3V0LCBwbGFuZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgb3V0X2xpc3QucHVzaCh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dF9saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGlwX2luX1Byb2plY3Rpb25fU3BhY2UodjA6IFZlcnRleCwgdjE6IFZlcnRleCwgdjI6IFZlcnRleCwgcGNhbWVyYTogQ2FtZXJhKSB7XHJcbiAgICAgICAgLy8gVG9kbzrln7fooYw25YCL5bmz6Z2i55qE5LiJ6KeS5b2i6KOB5YiHXHJcbiAgICAgICAgLy8g5ZKMeei7uOWkvjQ15bqm55qEMuWAi+W5s+mdouOAgeWSjHjou7jlpL40NeW6pueahDLlgIvlubPpnaLjgIHpgoTmnIlOY+WSjEZjXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjguaHRtbFxyXG5cclxuICAgICAgICBsZXQgaW5fbGlzdCA9IFtuZXcgVHJpYW5nbGUodjAsIHYxLCB2MildO1xyXG5cclxuICAgICAgICAvLyBGYXJcclxuICAgICAgICBsZXQgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKGluX2xpc3QsXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gVC52MC53IDwgVC52MC5wLno7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gVC52MS53IDwgVC52MS5wLno7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gVC52Mi53IDwgVC52Mi5wLno7IH0sXHJcbiAgICAgICAgICAgIENsaXBQbGFuZS5GYXIpO1xyXG5cclxuICAgICAgICAvLyBOZWFyXHJcbiAgICAgICAgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKG91dF9saXN0LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIDAgPiBULnYwLnAuejsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiAwID4gVC52MS5wLno7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gMCA+IFQudjIucC56OyB9LFxyXG4gICAgICAgICAgICBDbGlwUGxhbmUuTmVhcik7XHJcblxyXG4gICAgICAgIC8vIOS4jeWwjVJpZ2h0IOOAgUxlZnTjgIFUb3DjgIFCb3R0b23kvZzoo4HliIfkuoZcclxuICAgICAgICAvLyDlj43mraPlnKhzY3JlZW4gc3BhY2XlhYnmn7XljJbkuInop5LlvaLmmYLkuZ/mnIPnlKjpgornlYzoo4HliIdcclxuICAgICAgICByZXR1cm4gb3V0X2xpc3Q7XHJcblxyXG4gICAgICAgIC8vIFJpZ2h0XHJcbiAgICAgICAgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKG91dF9saXN0LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIFQudjAudyA8IFQudjAucC54OyB9LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIFQudjEudyA8IFQudjEucC54OyB9LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIFQudjIudyA8IFQudjIucC54OyB9LFxyXG4gICAgICAgICAgICBDbGlwUGxhbmUuUmlnaHQpO1xyXG5cclxuICAgICAgICAvLyBMZWZ0XHJcbiAgICAgICAgb3V0X2xpc3QgPSBSYXN0ZXJpemVyLmNsaXBfaGVscGVyKG91dF9saXN0LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIC1ULnYwLncgPiBULnYwLnAueDsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiAtVC52MS53ID4gVC52MS5wLng7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gLVQudjIudyA+IFQudjIucC54OyB9LFxyXG4gICAgICAgICAgICBDbGlwUGxhbmUuTGVmdCk7XHJcblxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIG91dF9saXN0ID0gUmFzdGVyaXplci5jbGlwX2hlbHBlcihvdXRfbGlzdCxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiBULnYwLncgPCBULnYwLnAueTsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiBULnYxLncgPCBULnYxLnAueTsgfSxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiBULnYyLncgPCBULnYyLnAueTsgfSxcclxuICAgICAgICAgICAgQ2xpcFBsYW5lLlRvcCk7XHJcblxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIG91dF9saXN0ID0gUmFzdGVyaXplci5jbGlwX2hlbHBlcihvdXRfbGlzdCxcclxuICAgICAgICAgICAgKFQ6IFRyaWFuZ2xlKSA9PiB7IHJldHVybiAtVC52MC53ID4gVC52MC5wLnk7IH0sXHJcbiAgICAgICAgICAgIChUOiBUcmlhbmdsZSkgPT4geyByZXR1cm4gLVQudjEudyA+IFQudjEucC55OyB9LFxyXG4gICAgICAgICAgICAoVDogVHJpYW5nbGUpID0+IHsgcmV0dXJuIC1ULnYyLncgPiBULnYyLnAueTsgfSxcclxuICAgICAgICAgICAgQ2xpcFBsYW5lLkJvdHRvbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTVZQX2JhY2tmYWNlX2N1bGxpbmdfY2xpcHBpbmcodHJpYW5nbGU6IFRyaWFuZ2xlLCBwY2FtZXJhOiBDYW1lcmEsIHdvcmxkVHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcclxuICAgICAgICAvLyB0byB3b3JsZCBzcGFjZVxyXG4gICAgICAgIGxldCB2MF93ID0gVHJhbnNmb3JtLnRyYW5zZm9ybVBvaW50KHdvcmxkVHJhbnNmb3JtLCB0cmlhbmdsZS52MC5wKTtcclxuICAgICAgICBsZXQgdjFfdyA9IFRyYW5zZm9ybS50cmFuc2Zvcm1Qb2ludCh3b3JsZFRyYW5zZm9ybSwgdHJpYW5nbGUudjEucCk7XHJcbiAgICAgICAgbGV0IHYyX3cgPSBUcmFuc2Zvcm0udHJhbnNmb3JtUG9pbnQod29ybGRUcmFuc2Zvcm0sIHRyaWFuZ2xlLnYyLnApO1xyXG5cclxuICAgICAgICAvLyB0byBjYW1lcmEgc3BhY2VcclxuICAgICAgICBsZXQgdjBfYyA9IHBjYW1lcmEudG9DYW1lcmFTcGFjZSh2MF93KTtcclxuICAgICAgICBsZXQgdjFfYyA9IHBjYW1lcmEudG9DYW1lcmFTcGFjZSh2MV93KTtcclxuICAgICAgICBsZXQgdjJfYyA9IHBjYW1lcmEudG9DYW1lcmFTcGFjZSh2Ml93KTtcclxuXHJcbiAgICAgICAgLy8gdG8gcHJvamVjdGlvbiBzcGFjZSAoY2xpcCBzcGFjZSlcclxuICAgICAgICBsZXQgdjBfcCA9IHBjYW1lcmEudG9Qcm9qZWN0aW9uU3BhY2UodjBfYyk7XHJcbiAgICAgICAgbGV0IHYxX3AgPSBwY2FtZXJhLnRvUHJvamVjdGlvblNwYWNlKHYxX2MpO1xyXG4gICAgICAgIGxldCB2Ml9wID0gcGNhbWVyYS50b1Byb2plY3Rpb25TcGFjZSh2Ml9jKTtcclxuXHJcbiAgICAgICAgLy8gYmFjayBmYWNlIGN1bGxpbmcgXHJcbiAgICAgICAgLy8gbGV0IHYwX3Rlc3QgPSBuZXcgVmVjdG9yKHYwX3AueCwgdjBfcC55LCB2MF9jLnopO1xyXG4gICAgICAgIC8vIGxldCB2MV90ZXN0ID0gbmV3IFZlY3Rvcih2MV9wLngsIHYxX3AueSwgdjFfYy56KTtcclxuICAgICAgICAvLyBsZXQgdjJfdGVzdCA9IG5ldyBWZWN0b3IodjJfcC54LCB2Ml9wLnksIHYyX2Mueik7XHJcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IFZlY3Rvci5jYWxjdWxhdGVfbm9ybWFsKHYwX3Rlc3QsIHYxX3Rlc3QsIHYyX3Rlc3QpO1xyXG4gICAgICAgIC8vIGxldCBjZW50ZXJfdG9fZXllID0gVmVjdG9yLm1pbnVzKFZlY3Rvci56ZXJvLCBWZWN0b3IuY2FsY3VsYXRlX2NlbnRlcih2MF90ZXN0LCB2MV90ZXN0LCB2Ml90ZXN0KSkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgIC8vIOWcqHZpZXcgc3BhY2XlgZrvvIzkuI3nhLblnKhjbGlwIHNwYWNl5YGa77yM6YKE6KaB5oqKeueUqHflj5bku6PmjonvvIzmnInpu57mkJ7lt6VcclxuICAgICAgICBsZXQgbm9ybWFsID0gVmVjdG9yLmNhbGN1bGF0ZV9ub3JtYWwodjBfYywgdjFfYywgdjJfYyk7XHJcbiAgICAgICAgbGV0IGNlbnRlcl90b19leWUgPSBWZWN0b3IubWludXMoVmVjdG9yLnplcm8sIFZlY3Rvci5jYWxjdWxhdGVfY2VudGVyKHYwX2MsIHYxX2MsIHYyX2MpKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgY29zX3ZhbHVlID0gVmVjdG9yLmRvdChub3JtYWwsIGNlbnRlcl90b19leWUpOztcclxuICAgICAgICBpZiAoY29zX3ZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1bGxpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDph43mlrDntoHlrpp1dlxyXG4gICAgICAgIGxldCB2MCA9IHRyaWFuZ2xlLnYwLmNsb25lKCkudXBkYXRlX3AodjBfcCkudXBkYXRlX3codjBfYy56KTtcclxuICAgICAgICBsZXQgdjEgPSB0cmlhbmdsZS52MS5jbG9uZSgpLnVwZGF0ZV9wKHYxX3ApLnVwZGF0ZV93KHYxX2Mueik7XHJcbiAgICAgICAgbGV0IHYyID0gdHJpYW5nbGUudjIuY2xvbmUoKS51cGRhdGVfcCh2Ml9wKS51cGRhdGVfdyh2Ml9jLnopO1xyXG5cclxuICAgICAgICAvLyDln7fooYzkuInop5LlvaLoo4HliIdcclxuICAgICAgICByZXR1cm4gUmFzdGVyaXplci5jbGlwX2luX1Byb2plY3Rpb25fU3BhY2UodjAsIHYxLCB2MiwgcGNhbWVyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVzZV9zb2xpZF9jb2xvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc3RhdGljIG5kY19jbGFtcF9lZmZlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXRpYyBwZWVrX3NjcmVlbl9wb3M6IFZlY3RvcjJEO1xyXG5cclxuICAgIHN0YXRpYyBzZXRfcGVla19zY3JlZW5fcG9zKHBlZWtfc2NyZWVuX3BvczogVmVjdG9yMkQpIHtcclxuICAgICAgICBSYXN0ZXJpemVyLnBlZWtfc2NyZWVuX3BvcyA9IHBlZWtfc2NyZWVuX3BvcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcHJpbnRfb25jZSA9IGZhbHNlO1xyXG4gICAgc3RhdGljIHByaW50X3BlZWtfcG9zaXRpb24oKSB7XHJcbiAgICAgICAgUmFzdGVyaXplci5wcmludF9vbmNlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZygncHJpbnRfcGVla19wb3NpdGlvbicpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHByb2Nlc3ModHJpYW5nbGU6IFRyaWFuZ2xlLCBwY2FtZXJhOiBDYW1lcmEsIHdvcmxkVHJhbnNmb3JtOiBUcmFuc2Zvcm0sIHRleHR1cmU6IFRleHR1cmUyRCkge1xyXG5cclxuICAgICAgICAvLyB0byBNVlBcclxuICAgICAgICBsZXQgdHJpYW5nbGVfbGlzdCA9IFJhc3Rlcml6ZXIuTVZQX2JhY2tmYWNlX2N1bGxpbmdfY2xpcHBpbmcodHJpYW5nbGUsIHBjYW1lcmEsIHdvcmxkVHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIC8vIHRvIE5EQ1xyXG4gICAgICAgIGZvciAobGV0IFQgb2YgdHJpYW5nbGVfbGlzdCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG4wID0gcGNhbWVyYS50b05EQyhULnYwLnAsIFQudjAudyk7XHJcbiAgICAgICAgICAgIGxldCBuMSA9IHBjYW1lcmEudG9OREMoVC52MS5wLCBULnYxLncpO1xyXG4gICAgICAgICAgICBsZXQgbjIgPSBwY2FtZXJhLnRvTkRDKFQudjIucCwgVC52Mi53KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5EQ+aHieipsuimgeiQveWcqFxyXG4gICAgICAgICAgICAvLyAtMSDiiaQgeCDiiaQgMSwgLTEg4omkIHkg4omkIDFcclxuXHJcbiAgICAgICAgICAgIC8vIOS4jeijgeWIh2xlZnTjgIFyaWdodOOAgXRvcOOAgWJvdHRvbe+8jOeEtuW+jGNsYW1wIG5kY+S5n+eul+aYr+S4gOeorueJueauiuaViOaenFxyXG4gICAgICAgICAgICBpZiAoUmFzdGVyaXplci5uZGNfY2xhbXBfZWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBuMC5jbGFtcF94KC0xLCAxKS5jbGFtcF95KC0xLCAxKTtcclxuICAgICAgICAgICAgICAgIG4xLmNsYW1wX3goLTEsIDEpLmNsYW1wX3koLTEsIDEpO1xyXG4gICAgICAgICAgICAgICAgbjIuY2xhbXBfeCgtMSwgMSkuY2xhbXBfeSgtMSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRvIHNjcmVlbiBzcGFjZVxyXG4gICAgICAgICAgICAvLyAwIOKJpCB4IOKJpCB3LCAwIOKJpCB5IOKJpCBoXHJcbiAgICAgICAgICAgIGxldCBzMCA9IHBjYW1lcmEudG9TY3JlZW5TcGFjZShuMCk7XHJcbiAgICAgICAgICAgIGxldCBzMSA9IHBjYW1lcmEudG9TY3JlZW5TcGFjZShuMSk7XHJcbiAgICAgICAgICAgIGxldCBzMiA9IHBjYW1lcmEudG9TY3JlZW5TcGFjZShuMik7XHJcblxyXG4gICAgICAgICAgICAvLyDngrrkuoblkozmnKzkvobnmoRjb2Rl55u45a6577yM5pqr5pmC5YWI5YKz5Ye65Y67XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzMCk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzMSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzMik7XHJcblxyXG4gICAgICAgICAgICAvLyDmib7lh7rljIXlnI3nmoTnn6nlvaJcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjguaHRtbFxyXG4gICAgICAgICAgICAvLyDlnJYgU2NyZWVuIFNwYWNlXHJcbiAgICAgICAgICAgIGxldCB7IG1pbiwgbWF4IH0gPSBWZWN0b3IubWluX21heChzMCwgczEsIHMyKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWluLngsIG1heC54LCAnfCcsIG1pbi55LCBtYXgueSk7XHJcbiAgICAgICAgICAgIGxldCBtaW5feCA9IE1hdGguZmxvb3IobWluLngpO1xyXG4gICAgICAgICAgICBsZXQgbWF4X3ggPSBNYXRoLmZsb29yKG1heC54KTtcclxuICAgICAgICAgICAgbGV0IG1pbl95ID0gTWF0aC5mbG9vcihtaW4ueSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhfeSA9IE1hdGguZmxvb3IobWF4LnkpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2xhbXAgYnkgc2NyZWVuIHNpemVcclxuICAgICAgICAgICAgbWluX3ggPSBNYXRoLm1heCgwLCBtaW5feCk7XHJcbiAgICAgICAgICAgIG1pbl95ID0gTWF0aC5tYXgoMCwgbWluX3kpO1xyXG4gICAgICAgICAgICBtYXhfeCA9IE1hdGgubWluKHRoaXMuY29sb3JfYnVmZmVyLncgLSAxLCBtYXhfeCk7XHJcbiAgICAgICAgICAgIG1heF95ID0gTWF0aC5taW4odGhpcy5jb2xvcl9idWZmZXIuaCAtIDEsIG1heF95KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhbGwgPSAobWF4X3ggLSBtaW5feCkgKiAobWF4X3kgLSBtaW5feSk7XHJcbiAgICAgICAgICAgIGxldCBkcmF3ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBoYWxmX3dfcGl4ZWwgPSAwLjUgLyBSYXN0ZXJpemVyLmNvbG9yX2J1ZmZlci53O1xyXG4gICAgICAgICAgICBsZXQgaGFsZl9oX3BpeGVsID0gMC41IC8gUmFzdGVyaXplci5jb2xvcl9idWZmZXIuaDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFsZl93X3BpeGVsLCBoYWxmX2hfcGl4ZWwpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbWluX3g7IHggPD0gbWF4X3g7ICsreCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IG1pbl95OyB5IDw9IG1heF95OyArK3kpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAyMS8xMS9ibG9nLXBvc3RfMjguaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWcliBTY3JlZW4gU3BhY2VcclxuICAgICAgICAgICAgICAgICAgICBsZXQgUCA9IG5ldyBWZWN0b3IoeCArIDAuNSwgeSArIDAuNSwgMClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCN55+p5b2i6KOh55qE5q+P5YCL6bueUFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIpOWumuaYr+WQpuS9jeWcqHNjcmVlbiBzcGFjZeS4ieinkuW9ouijoemdolxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB7IHN1Y2Nlc3MsIM6xLCDOsiwgzrMgfSA9IFRyaWFuZ2xlLmNhbGN1bGF0ZV/OsV/Osl/OsyhzMCwgczEsIHMyLCBQKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSYXN0ZXJpemVyLnByaW50X29uY2UgJiYgeCA9PSBSYXN0ZXJpemVyLnBlZWtfc2NyZWVuX3Bvcy54ICYmIHkgPT0gUmFzdGVyaXplci5wZWVrX3NjcmVlbl9wb3MueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXNfaW5fdHJpYW5nbGUnLCBUcmlhbmdsZS5pc19pbl90cmlhbmdsZSjOsSwgzrIsIM6zKSwgzrEsIM6yLCDOsyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVRyaWFuZ2xlLmlzX2luX3RyaWFuZ2xlKM6xLCDOsiwgzrMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgeWVzIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICgxKeioiOeul3rlgLwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5b6eTkRD5YiwU2NyZWVuIFNwYWNl5piv5Lu/5bCE6K6K5o+b77yM5YWn5o+S5qyK6YeNzrHjgIHOsuOAgc6z5LiA5qijXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9ncG5ub3Rlcy5ibG9nc3BvdC5jb20vMjAxOS8xMS9ibG9nLXBvc3RfMzAuaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB6ID0gVHJpYW5nbGUuaW50ZXJwb2xhdGlvbijOsywgzrEsIM6yLCBuMC56LCBuMS56LCBuMi56KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8geiB0ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZlcl96ID0gUmFzdGVyaXplci56X2J1ZmZlci5nZXQoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHogPiBidWZmZXJfeilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWvq+WFpXrlgLxcclxuICAgICAgICAgICAgICAgICAgICBSYXN0ZXJpemVyLnpfYnVmZmVyLnNldCh4LCB5LCB6KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKDIp5ZyoTkRD6YCy6KGM5YWn5o+S77yM5LmY5LiKd+WbnuWIsHByb2plY3Rpb24gc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dwbm5vdGVzLmJsb2dzcG90LmNvbS8yMDIxLzExL2Jsb2ctcG9zdF8yNy5odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHcgPSAxIC8gVHJpYW5nbGUuaW50ZXJwb2xhdGlvbijOsywgzrEsIM6yLCAxIC8gVC52MC53LCAxIC8gVC52MS53LCAxIC8gVC52Mi53KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KaB5ZyoTkRD5o+S5YC877yM5omA5Lul6Zmk5Luld1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1X25kYyA9IFRyaWFuZ2xlLmludGVycG9sYXRpb24ozrMsIM6xLCDOsiwgVC52MC51IC8gVC52MC53LCBULnYxLnUgLyBULnYxLncsIFQudjIudSAvIFQudjIudyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZfbmRjID0gVHJpYW5nbGUuaW50ZXJwb2xhdGlvbijOsywgzrEsIM6yLCBULnYwLnYgLyBULnYwLncsIFQudjEudiAvIFQudjEudywgVC52Mi52IC8gVC52Mi53KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvamVjdGlvbiBzcGFjZSBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdSA9IHVfbmRjICogdztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHZfbmRjICogdztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgY29sb3IgfSA9IHRleHR1cmUuZ2V0KG5ldyBWZWN0b3IyRCh1LCB2KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJhc3Rlcml6ZXIudXNlX3NvbGlkX2NvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSYXN0ZXJpemVyLmNvbG9yX2J1ZmZlci5zZXQoeCwgeSwgUkdCQS55ZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFzdGVyaXplci5jb2xvcl9idWZmZXIuc2V0KHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSYXN0ZXJpemVyLnByaW50X29uY2UgJiYgeCA9PSBSYXN0ZXJpemVyLnBlZWtfc2NyZWVuX3Bvcy54ICYmIHkgPT0gUmFzdGVyaXplci5wZWVrX3NjcmVlbl9wb3MueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Zyo5LiJ6KeS5b2i5YWnJywgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb3VudCwgTWF0aC5mbG9vcigxMDAgKiBkcmF3IC8gYWxsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChSYXN0ZXJpemVyLnByaW50X29uY2UpIHtcclxuICAgICAgICAgICAgUmFzdGVyaXplci5wcmludF9vbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2ggcGVlaycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjb3IgZnJvbSBcIi4vVmVjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXkge1xyXG4gICAgZnJvbTogVmVjb3I7XHJcbiAgICBkaXI6IFZlY29yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZyb206IFZlY29yLCBkaXI6IFZlY29yKSB7XHJcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcclxuICAgICAgICB0aGlzLmRpciA9IGRpcjtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgVmVjb3I0RCBmcm9tIFwiLi9WZWN0b3I0RFwiO1xyXG5cclxuLy8g5ZyoM0Qgc3BhY2Xoo4HliIfnmoToqbFcclxuLy8g6YKE6KaB6ICD5oWu5LuA6bq85pmC5YCZ6KaB55SoKHgseSx3KeijgeWIh1xyXG4vLyDku4DpurzmmYLlgJnopoHnlKgoeCx5LHop6KOB5YiHXHJcbi8vIFxyXG4vLyDkuI3lpoLnm7TmjqXlnKg0RCBzcGFjZeijgeWIh1xyXG4vLyBodHRwczovL2dwbm5vdGVzLmJsb2dzcG90LmNvbS8yMDIxLzExL2Jsb2ctcG9zdF8yOC5odG1sXHJcbi8vIOWcliA0RCBzcGFjZSBjbGlwXHJcbi8vIOmAmeijoeeUqERpcmVjdHjnmoRORENcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF5NEQge1xyXG4gICAgZnJvbTogVmVjb3I0RDtcclxuICAgIGRpcjogVmVjb3I0RDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmcm9tOiBWZWNvcjRELCB0bzogVmVjb3I0RCkge1xyXG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XHJcbiAgICAgICAgdGhpcy5kaXIgPSBuZXcgVmVjb3I0RChWZWN0b3IubWludXModG8ucCwgZnJvbS5wKSwgdG8udyAtIGZyb20udyk7XHJcbiAgICB9XHJcblxyXG4gICAgdF93aGVuX3hfZXF1YWxfdygpIHtcclxuICAgICAgICAvLyBmcm9tLnggKyB0ICogZGlyLng9IGZyb20udyArIHQgKiBkaXIudztcclxuICAgICAgICBsZXQgdCA9ICh0aGlzLmZyb20udyAtIHRoaXMuZnJvbS5wLngpIC8gKHRoaXMuZGlyLnAueCAtIHRoaXMuZGlyLncpO1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG5cclxuICAgIHRfd2hlbl95X2VxdWFsX3coKSB7XHJcbiAgICAgICAgbGV0IHQgPSAodGhpcy5mcm9tLncgLSB0aGlzLmZyb20ucC55KSAvICh0aGlzLmRpci5wLnkgLSB0aGlzLmRpci53KTtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuXHJcbiAgICB0X3doZW5fel9lcXVhbF93KCkge1xyXG4gICAgICAgIGxldCB0ID0gKHRoaXMuZnJvbS53IC0gdGhpcy5mcm9tLnAueikgLyAodGhpcy5kaXIucC56IC0gdGhpcy5kaXIudyk7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdF93aGVuX3hfZXF1YWxfbWludXNfdygpIHtcclxuICAgICAgICAvLyBmcm9tLnggKyB0ICogZGlyLng9IC0oZnJvbS53ICsgdCAqIGRpci53KTtcclxuXHJcbiAgICAgICAgbGV0IHQgPSAtKHRoaXMuZnJvbS53ICsgdGhpcy5mcm9tLnAueCkgLyAodGhpcy5kaXIudyArIHRoaXMuZGlyLnAueCk7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdF93aGVuX3lfZXF1YWxfbWludXNfdygpIHtcclxuICAgICAgICBsZXQgdCA9IC0odGhpcy5mcm9tLncgKyB0aGlzLmZyb20ucC55KSAvICh0aGlzLmRpci53ICsgdGhpcy5kaXIucC55KTtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuXHJcbiAgICB0X3doZW5fel9lcXVhbF96ZXJvX3coKSB7XHJcblxyXG4gICAgICAgIC8vIGZyb20ueiArIHQgKiBkaXIuej0gMDtcclxuICAgICAgICBsZXQgdCA9IC10aGlzLmZyb20ucC56IC8gdGhpcy5kaXIucC56O1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBQbGFuZSBmcm9tIFwiLi9QbGFuZVwiO1xyXG5pbXBvcnQgUmF5IGZyb20gXCIuL1JheVwiO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgSGl0SW5mbyBmcm9tIFwiLi9IaXRJbmZvXCI7XHJcbmltcG9ydCBIaXRhYmxlIGZyb20gXCIuL0hpdGFibGVcIjtcclxuaW1wb3J0IFNoYWRlciBmcm9tIFwiLi4vTWF0ZXJhaWxzL1NoYWRlclwiO1xyXG5cclxuLy8g5bCP5pa55aGKXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3QgaW1wbGVtZW50cyBIaXRhYmxlIHtcclxuICAgIHBsYW5lOiBQbGFuZTtcclxuICAgIHc6IG51bWJlcjtcclxuICAgIGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbGFuZTogUGxhbmUsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wbGFuZSA9IHBsYW5lO1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICAgICAgdGhpcy5oID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBoaXQocmF5OiBSYXksIHM6IFNoYWRlcik6IEhpdEluZm8gfCBudWxsIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wbGFuZS5oaXQocmF5LCBzKTtcclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGxldCBoaXRfcG9zID0gcmVzdWx0LmhpdF9wb3M7XHJcbiAgICAgICAgICAgIGxldCBkaWZmID0gaGl0X3Bvcy5taW51cyh0aGlzLnBsYW5lLkMpO1xyXG5cclxuICAgICAgICAgICAgLy8g6YG/6ZaL55u4562J55qE5oOF5rOBXHJcbiAgICAgICAgICAgIGxldCBoZWxwX3YgPSBWZWN0b3IuZXF1YWwodGhpcy5wbGFuZS5OLCBWZWN0b3IudXApID8gbmV3IFZlY3RvcigxLCAwLCAwKSA6IFZlY3Rvci51cDtcclxuXHJcbiAgICAgICAgICAgIGxldCB3X2F4aXMgPSBWZWN0b3IuY3Jvc3MoaGVscF92LCB0aGlzLnBsYW5lLk4pLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgaF9heGlzID0gVmVjdG9yLmNyb3NzKHdfYXhpcywgdGhpcy5wbGFuZS5OKTtcclxuICAgICAgICAgICAgbGV0IHdfdmFsdWUgPSBWZWN0b3IuZG90KGRpZmYsIHdfYXhpcyk7XHJcbiAgICAgICAgICAgIGxldCBoX3ZhbHVlID0gVmVjdG9yLmRvdChkaWZmLCBoX2F4aXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlzX2hpdCA9IE1hdGguYWJzKHdfdmFsdWUpIDwgdGhpcy53ICYmIE1hdGguYWJzKGhfdmFsdWUpIDwgdGhpcy5oO1xyXG4gICAgICAgICAgICBpZiAoaXNfaGl0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUkdCQSBmcm9tIFwiLi9SR0JBXCI7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSBcIi4vVmVjdG9yXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlclRhcmdldCB7XHJcbiAgICB3OiBudW1iZXIgPSAzMjA7XHJcbiAgICBoOiBudW1iZXIgPSAyNDA7XHJcbiAgICBiYWNrYnVmZmVyOiBPZmZzY3JlZW5DYW52YXM7XHJcbiAgICBjb25zdHJ1Y3Rvcih3OiBudW1iZXIgPSAzMjAsIGg6IG51bWJlciA9IDI0MCkge1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICAgICAgdGhpcy5oID0gaDtcclxuICAgICAgICB0aGlzLmJhY2tidWZmZXIgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHRoaXMudywgdGhpcy5oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJfcGl4ZWwoZnVuYzogKHhfd2VpZ2h0OiBudW1iZXIsIHlfd2VpZ2h0OiBudW1iZXIsIHJhdGlvOiBudW1iZXIpID0+IFZlY3Rvcikge1xyXG5cclxuICAgICAgICBsZXQgY29udGV4dF8yZCA9IHRoaXMuYmFja2J1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmICghY29udGV4dF8yZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0IGNvbnRleHQgZmFpbGVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBzb3VyY2UgZGF0YSBhcnJheVxyXG4gICAgICAgIGxldCBiYWNrYnVmZmVyX2RhdGEgPSBjb250ZXh0XzJkLmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLncsIHRoaXMuaCk7XHJcbiAgICAgICAgbGV0IGJhY2tidWZmZXJfZGF0YV9hcnJheSA9IGJhY2tidWZmZXJfZGF0YS5kYXRhO1xyXG5cclxuICAgICAgICBsZXQgcmF0aW8gPSB0aGlzLncgLyB0aGlzLmg7XHJcblxyXG4gICAgICAgIC8vIHNldCBhcnJheSB2YWx1ZVxyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oOyArK3kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnc7ICsreCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmdiYSBlYWNoIGNvbG9yIGlzIDRieXRlXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSA0ICogKHggKyB5ICogdGhpcy53KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LmludHJvLXRvLWR4ci5jd3ltYW4ub3JnL3ByZXNlbnRhdGlvbnMvSW50cm9EWFJfUmF5dHJhY2luZ1NoYWRlcnMucGRmXHJcbiAgICAgICAgICAgICAgICAvLyBwYWdlIDc4XHJcbiAgICAgICAgICAgICAgICAvLyDpnIDopoHlgY/np7vljYrlgIvlg4/ntKDnmoTplbfluqbvvIzmiY3mnIPokL3lnKjlg4/ntKDnmoTkuK3plpMo5LiN6YGO6IKJ55y855yL5LiN5aSq5Ye65beu5Yil5bCx5piv5LqGKVxyXG4gICAgICAgICAgICAgICAgLy8gcmVtYXAgdG8gMH4xXHJcbiAgICAgICAgICAgICAgICBsZXQgWCA9ICgoeCArIDAuNSkgLyB0aGlzLncpO1xyXG4gICAgICAgICAgICAgICAgbGV0IFkgPSAoKHkgKyAwLjUpIC8gdGhpcy5oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgeSBkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgIFkgPSAxIC0gWTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1hcCB0byAtMX4xXHJcbiAgICAgICAgICAgICAgICBsZXQgeF93ZWlnaHQgPSBYICogMiAtIDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgeV93ZWlnaHQgPSBZICogMiAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gZnVuYyh4X3dlaWdodCwgeV93ZWlnaHQsIHJhdGlvKTtcclxuICAgICAgICAgICAgICAgIGxldCByID0gY29sb3IueDtcclxuICAgICAgICAgICAgICAgIGxldCBnID0gY29sb3IueTtcclxuICAgICAgICAgICAgICAgIGxldCBiID0gY29sb3IuejtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnYW1tYeagoeato1xyXG4gICAgICAgICAgICAgICAgbGV0IGdhbW1hID0gMSAvIDIuMTtcclxuICAgICAgICAgICAgICAgIHIgPSBNYXRoLnBvdyhyLCBnYW1tYSk7XHJcbiAgICAgICAgICAgICAgICBnID0gTWF0aC5wb3coZywgZ2FtbWEpO1xyXG4gICAgICAgICAgICAgICAgYiA9IE1hdGgucG93KGIsIGdhbW1hKTtcclxuXHJcbiAgICAgICAgICAgICAgICBiYWNrYnVmZmVyX2RhdGFfYXJyYXlbaW5kZXgrK10gPSBNYXRoLnJvdW5kKHIgKiAyNTUpO1xyXG4gICAgICAgICAgICAgICAgYmFja2J1ZmZlcl9kYXRhX2FycmF5W2luZGV4KytdID0gTWF0aC5yb3VuZChnICogMjU1KTtcclxuICAgICAgICAgICAgICAgIGJhY2tidWZmZXJfZGF0YV9hcnJheVtpbmRleCsrXSA9IE1hdGgucm91bmQoYiAqIDI1NSk7XHJcbiAgICAgICAgICAgICAgICBiYWNrYnVmZmVyX2RhdGFfYXJyYXlbaW5kZXhdID0gMjU1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHRfMmQucHV0SW1hZ2VEYXRhKGJhY2tidWZmZXJfZGF0YSwgMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3BpeGVsKGZ1bmM6ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gUkdCQSkge1xyXG5cclxuICAgICAgICBsZXQgY29udGV4dF8yZCA9IHRoaXMuYmFja2J1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmICghY29udGV4dF8yZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0IGNvbnRleHQgZmFpbGVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBzb3VyY2UgZGF0YSBhcnJheVxyXG4gICAgICAgIGxldCBiYWNrYnVmZmVyX2RhdGEgPSBjb250ZXh0XzJkLmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLncsIHRoaXMuaCk7XHJcbiAgICAgICAgbGV0IGJhY2tidWZmZXJfZGF0YV9hcnJheSA9IGJhY2tidWZmZXJfZGF0YS5kYXRhO1xyXG5cclxuICAgICAgICBsZXQgcmF0aW8gPSB0aGlzLncgLyB0aGlzLmg7XHJcblxyXG4gICAgICAgIC8vIHNldCBhcnJheSB2YWx1ZVxyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oOyArK3kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnc7ICsreCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmdiYSBlYWNoIGNvbG9yIGlzIDRieXRlXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSA0ICogKHggKyB5ICogdGhpcy53KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBmdW5jKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHIgPSBjb2xvci5yO1xyXG4gICAgICAgICAgICAgICAgbGV0IGcgPSBjb2xvci5nO1xyXG4gICAgICAgICAgICAgICAgbGV0IGIgPSBjb2xvci5iO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOaykuWOu2dhbW1h77yM5Lmf5LiN55SoZ2FtbWHmoKHmraNcclxuICAgICAgICAgICAgICAgIC8vIGxldCBnYW1tYSA9IDEgLyAyLjE7XHJcbiAgICAgICAgICAgICAgICAvLyByID0gTWF0aC5wb3cociwgZ2FtbWEpO1xyXG4gICAgICAgICAgICAgICAgLy8gZyA9IE1hdGgucG93KGcsIGdhbW1hKTtcclxuICAgICAgICAgICAgICAgIC8vIGIgPSBNYXRoLnBvdyhiLCBnYW1tYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYmFja2J1ZmZlcl9kYXRhX2FycmF5W2luZGV4KytdID0gTWF0aC5yb3VuZChyICogMjU1KTtcclxuICAgICAgICAgICAgICAgIGJhY2tidWZmZXJfZGF0YV9hcnJheVtpbmRleCsrXSA9IE1hdGgucm91bmQoZyAqIDI1NSk7XHJcbiAgICAgICAgICAgICAgICBiYWNrYnVmZmVyX2RhdGFfYXJyYXlbaW5kZXgrK10gPSBNYXRoLnJvdW5kKGIgKiAyNTUpO1xyXG4gICAgICAgICAgICAgICAgYmFja2J1ZmZlcl9kYXRhX2FycmF5W2luZGV4XSA9IDI1NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0XzJkLnB1dEltYWdlRGF0YShiYWNrYnVmZmVyX2RhdGEsIDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dfYnVmZmVyKGNhbnZhc19pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8g6Kit5a6aYnVmZmVy55qE5aSn5bCP5ZKMY3NzIHN0eWxl55qE5aSn5bCP5LiA5qijXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9vcGVuaG9tZS5jYy9Hb3NzaXAvV2ViR0wvQ2FudmFzLmh0bWxcclxuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzX2lkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgICAgICBjYW52YXMuc3R5bGUud2lkdGggPSB0aGlzLncgKyAncHgnO1xyXG4gICAgICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLmggKyAncHgnO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gY29weSBiYWNrYnVmZmVyIHRvIGNhbnZhc1xyXG4gICAgICAgIGxldCBjb250ZXh0X2JpdG1hcF9yZW5kZXIgPSBjYW52YXMuZ2V0Q29udGV4dChcImJpdG1hcHJlbmRlcmVyXCIpO1xyXG4gICAgICAgIGlmICghY29udGV4dF9iaXRtYXBfcmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXQgY29udGV4dF9iaXRtYXBfcmVuZGVyIGZhaWxlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHRfYml0bWFwX3JlbmRlci50cmFuc2ZlckZyb21JbWFnZUJpdG1hcCh0aGlzLmJhY2tidWZmZXIudHJhbnNmZXJUb0ltYWdlQml0bWFwKCkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi9WZWN0b3JcIjtcclxuaW1wb3J0IFJheSBmcm9tIFwiLi9SYXlcIjtcclxuaW1wb3J0IHsgbnVtYmVyX2VxdWFsIH0gZnJvbSAnLi9Ub29sJztcclxuaW1wb3J0IEhpdEluZm8gZnJvbSBcIi4vSGl0SW5mb1wiO1xyXG5pbXBvcnQgSGl0YWJsZSBmcm9tIFwiLi9IaXRhYmxlXCI7XHJcbmltcG9ydCBTaGFkZXIgZnJvbSBcIi4uL01hdGVyYWlscy9TaGFkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaGVyZSBpbXBsZW1lbnRzIEhpdGFibGUge1xyXG5cclxuICAgIEM6IFZlY3RvcjsgLy8g55CD5Lit5b+DXHJcbiAgICBSOiBudW1iZXI7IC8vIOeQg+WNiuW+kVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKEM6IFZlY3RvciwgUjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5DID0gQztcclxuICAgICAgICB0aGlzLlIgPSBSO1xyXG4gICAgfVxyXG5cclxuICAgIGhpdChyYXk6IFJheSwgczogU2hhZGVyKTogSGl0SW5mbyB8IG51bGwge1xyXG4gICAgICAgIC8vIOinozLmrKHmlrnnqIvlvI9cclxuICAgICAgICAvLyAoWC1DKeOAgihYLUMpID0gUipSXHJcbiAgICAgICAgLy8gWD1GK3QqRFxyXG4gICAgICAgIC8vIHQ9WygtYi1zcXJ0X2spLzJhLCgtYitzcXJ0X2spLzJhXVxyXG4gICAgICAgIGxldCBEID0gcmF5LmRpcjtcclxuICAgICAgICBsZXQgRiA9IHJheS5mcm9tO1xyXG4gICAgICAgIGxldCBhID0gVmVjdG9yLmRvdChELCBEKTtcclxuICAgICAgICBsZXQgYiA9IDIgKiAoVmVjdG9yLmRvdChELCBGKSAtIFZlY3Rvci5kb3QoRCwgdGhpcy5DKSk7XHJcbiAgICAgICAgbGV0IGMgPSBWZWN0b3IuZG90KEYsIEYpIC0gMiAqIFZlY3Rvci5kb3QoRiwgdGhpcy5DKSArIFZlY3Rvci5kb3QodGhpcy5DLCB0aGlzLkMpIC0gdGhpcy5SICogdGhpcy5SO1xyXG5cclxuICAgICAgICBsZXQgayA9IGIgKiBiIC0gNCAqIGEgKiBjO1xyXG4gICAgICAgIGlmIChudW1iZXJfZXF1YWwoaywgMCkpIHsgIC8vIOS6pOaWvDHpu55cclxuICAgICAgICAgICAgbGV0IHQgPSAtYiAvICgyICogYSk7XHJcblxyXG4gICAgICAgICAgICAvL+aTi+aOiVxyXG4gICAgICAgICAgICBpZiAodCA8IDApIHsgcmV0dXJuIG51bGwgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhpdF9wb3MgPSBGLmFkZChELm11bHRpcGx5KHQpKTtcclxuICAgICAgICAgICAgbGV0IG5vcm1hbCA9IGhpdF9wb3MubWludXModGhpcy5DKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aXZlX3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoaXRfcG9zLFxyXG4gICAgICAgICAgICAgICAgaTogRCxcclxuICAgICAgICAgICAgICAgIHQsXHJcbiAgICAgICAgICAgICAgICBub3JtYWwsXHJcbiAgICAgICAgICAgICAgICBzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoayA+IDApIHsgLy8g5Lqk5pa8Mum7nlxyXG5cclxuICAgICAgICAgICAgLy8g6YGO5r++5Ye6dD4wXHJcbiAgICAgICAgICAgIC8vIHJheS5mcm9t5Zyo55CD5YWn5pyJ5Y+v6IO95Ye654++dDwwXHJcbiAgICAgICAgICAgIC8vIOeQg+WcqHJheeeahOW+jOmdouS5n+WPr+iDveWHuuePvnQ8MFxyXG4gICAgICAgICAgICBsZXQgc3FydF9rID0gTWF0aC5zcXJ0KGspO1xyXG4gICAgICAgICAgICBsZXQgdF9saXN0ID0gWygtYiAtIHNxcnRfaykgLyAoMiAqIGEpLCAoLWIgKyBzcXJ0X2spIC8gKDIgKiBhKV0uZmlsdGVyKHggPT4geCA+IDApO1xyXG5cclxuICAgICAgICAgICAgLy8g6YO95piv6LKg5YC8XHJcbiAgICAgICAgICAgIGlmICh0X2xpc3QubGVuZ3RoID09IDApIHsgcmV0dXJuIG51bGwgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHQgPSB0X2xpc3RbMF07XHJcbiAgICAgICAgICAgIGxldCBoaXRfcG9zID0gRi5hZGQoRC5tdWx0aXBseSh0KSk7XHJcbiAgICAgICAgICAgIGxldCBub3JtYWwgPSBoaXRfcG9zLm1pbnVzKHRoaXMuQykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGl2ZV90OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGl0X3BvcyxcclxuICAgICAgICAgICAgICAgIGk6IEQsXHJcbiAgICAgICAgICAgICAgICB0LFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsLFxyXG4gICAgICAgICAgICAgICAgc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHsgLy8g5rKS5Lqk6bueXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNjZW5lTm9kZSBmcm9tIFwiLi4vT2JqZWN0L1NjZW5lTm9kZVwiO1xyXG5pbXBvcnQgUmF5IGZyb20gXCIuL1JheVwiO1xyXG5pbXBvcnQgUmF5NEQgZnJvbSBcIi4vUmF5NERcIjtcclxuaW1wb3J0IEhpdEluZm8gZnJvbSBcIi4vSGl0SW5mb1wiO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgVHJpYW5nbGUgZnJvbSBcIi4vVHJpYW5nbGVcIjtcclxuaW1wb3J0IFZlcnRleCBmcm9tIFwiLi9WZXJ0ZXhcIjtcclxuaW1wb3J0IFBsYW5lIGZyb20gXCIuL1BsYW5lXCI7XHJcbmltcG9ydCBSR0JBIGZyb20gXCIuL1JHQkFcIjtcclxuaW1wb3J0IEJ1ZmZlcjJEIGZyb20gXCIuL0J1ZmZlcjJEXCI7XHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZ3JlZV90b19SYWQoZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5QSSAqIGQgLyAxODA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXBzaWxvbjogbnVtYmVyID0gMC4wMDE7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyX2VxdWFsKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDwgZXBzaWxvbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICBpZiAoeCA+IG1heClcclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgZWxzZSBpZiAoeCA8IG1pbilcclxuICAgICAgICByZXR1cm4gbWluO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiB4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2hpdF9zb3J0X2xpc3Qob2JqX2xpc3Q6IFNjZW5lTm9kZVtdLCByYXk6IFJheSkge1xyXG5cclxuICAgIGxldCBsaXN0ID0gb2JqX2xpc3QubWFwKG9iaiA9PiBvYmouaC5oaXQocmF5LCBvYmoucykpO1xyXG4gICAgbGV0IGhpdF9saXN0ID0gPEhpdEluZm9bXT4obGlzdC5maWx0ZXIoaW5mbyA9PiBpbmZvICE9IG51bGwgJiYgaW5mby5wb3NpdGl2ZV90KSk7XHJcblxyXG4gICAgcmV0dXJuIGhpdF9saXN0LnNvcnQoKGE6IEhpdEluZm8sIGI6IEhpdEluZm8pID0+IGEudCAtIGIudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRfc2hhZG93X3dlaWdodChoaXRfaW5mbzogSGl0SW5mbywgZGlyZWN0aW9uX2xpZ2h0X2RpcjogVmVjdG9yLCBvYmpfbGlzdDogU2NlbmVOb2RlW10pIHtcclxuXHJcbiAgICAvLyDmmK/lkKblnKjlvbHlrZDlhadcclxuICAgIGxldCBkaXIgPSBkaXJlY3Rpb25fbGlnaHRfZGlyLm5lZ2F0aXZlKCk7XHJcbiAgICBsZXQgZnJvbSA9IGhpdF9pbmZvLmhpdF9wb3MuYWRkKGRpci5tdWx0aXBseShlcHNpbG9uKSk7IC8vIOWBj+enu+S4gOWwj+autei3nembou+8jOmBv+WFjeWwhOS4reiHquW3sVxyXG4gICAgbGV0IHJheSA9IG5ldyBSYXkoZnJvbSwgZGlyKTtcclxuICAgIGxldCBoaXRfc29ydF9saXN0ID0gZ2V0X2hpdF9zb3J0X2xpc3Qob2JqX2xpc3QsIHJheSk7XHJcbiAgICBpZiAoaGl0X3NvcnRfbGlzdC5sZW5ndGggIT0gMCkgeyAvLyDlnKjlvbHlrZDlhadcclxuICAgICAgICByZXR1cm4gMC40NTsgLy8g5LiN6KaB5aSq6buRXHJcbiAgICB9IGVsc2VcclxuICAgICAgICByZXR1cm4gMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAoYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGEgKyB0ICogKGIgLSBhKTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ2xpcFBsYW5lIHtcclxuICAgIE5lYXIsXHJcbiAgICBGYXIsXHJcbiAgICBSaWdodCxcclxuICAgIExlZnQsXHJcbiAgICBUb3AsXHJcbiAgICBCb3R0b21cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsaXAodHJpYW5nbGU6IFRyaWFuZ2xlLFxyXG4gICAgdjBfb3V0OiAodHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiBib29sZWFuLFxyXG4gICAgdjFfb3V0OiAodHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiBib29sZWFuLFxyXG4gICAgdjJfb3V0OiAodHJpYW5nbGU6IFRyaWFuZ2xlKSA9PiBib29sZWFuLFxyXG4gICAgcGxhbmU6IENsaXBQbGFuZSkge1xyXG5cclxuICAgIGxldCB2X2NsaXA6IFRyaWFuZ2xlW10gPSBbXTtcclxuXHJcbiAgICBsZXQgZ2V0Q3Jvc3NQb2ludCA9IGZ1bmN0aW9uICh2MDogVmVydGV4LCB2MTogVmVydGV4KSB7XHJcbiAgICAgICAgbGV0IHJheSA9IG5ldyBSYXk0RCh2MC5nZXRfVmVjdG9yNEQoKSwgdjEuZ2V0X1ZlY3RvcjREKCkpO1xyXG5cclxuICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChwbGFuZSkge1xyXG4gICAgICAgICAgICBjYXNlIENsaXBQbGFuZS5GYXI6XHJcbiAgICAgICAgICAgICAgICB0ID0gcmF5LnRfd2hlbl96X2VxdWFsX3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENsaXBQbGFuZS5OZWFyOlxyXG4gICAgICAgICAgICAgICAgdCA9IHJheS50X3doZW5fel9lcXVhbF96ZXJvX3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENsaXBQbGFuZS5SaWdodDpcclxuICAgICAgICAgICAgICAgIHQgPSByYXkudF93aGVuX3hfZXF1YWxfdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2xpcFBsYW5lLkxlZnQ6XHJcbiAgICAgICAgICAgICAgICB0ID0gcmF5LnRfd2hlbl94X2VxdWFsX21pbnVzX3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENsaXBQbGFuZS5Ub3A6XHJcbiAgICAgICAgICAgICAgICB0ID0gcmF5LnRfd2hlbl95X2VxdWFsX3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENsaXBQbGFuZS5Cb3R0b206XHJcbiAgICAgICAgICAgICAgICB0ID0gcmF5LnRfd2hlbl95X2VxdWFsX21pbnVzX3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFZlcnRleC5sZXJwKHYwLCB2MSwgdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdm8gaW4gXHJcbiAgICBsZXQgY2xpcF9maXJzdF9pbiA9IGZ1bmN0aW9uICh2MDogVmVydGV4LCB2MTogVmVydGV4LCB2MjogVmVydGV4KSB7XHJcbiAgICAgICAgLy8gMSB0cmlhbmdsZSB0byAxIHRyaWFuZ2xlXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uZScpO1xyXG4gICAgICAgIHZfY2xpcFswXSA9IG5ldyBUcmlhbmdsZSh2MCwgZ2V0Q3Jvc3NQb2ludCh2MCwgdjEpLCBnZXRDcm9zc1BvaW50KHYwLCB2MikpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdm8gb3V0XHJcbiAgICBsZXQgY2xpcF9maXJzdF9vdXQgPSBmdW5jdGlvbiAodjA6IFZlcnRleCwgdjE6IFZlcnRleCwgdjI6IFZlcnRleCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0d28nKTtcclxuICAgICAgICAvLyAxIHRyaWFuZ2xlIHRvIDIgdHJpYW5nbGVcclxuICAgICAgICBsZXQgY3Jvc3MxID0gZ2V0Q3Jvc3NQb2ludCh2MiwgdjApO1xyXG4gICAgICAgIGxldCBjcm9zczIgPSBnZXRDcm9zc1BvaW50KHYwLCB2MSk7XHJcblxyXG4gICAgICAgIHZfY2xpcFswXSA9IG5ldyBUcmlhbmdsZSh2MiwgY3Jvc3MxLCBjcm9zczIpO1xyXG4gICAgICAgIHZfY2xpcFsxXSA9IG5ldyBUcmlhbmdsZSh2MiwgY3Jvc3MyLCB2MSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOaciTjnqK7mg4Xms4FcclxuICAgIGlmICh2MF9vdXQodHJpYW5nbGUpKS8vb3V0XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHYxX291dCh0cmlhbmdsZSkpLy8gb3V0IG91dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHYyX291dCh0cmlhbmdsZSkpLy8gb3V0IG91dCBvdXQgKG5vIGNsaXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmdWxsIG91dCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgLy9vdXQgb3V0IGluXHJcbiAgICAgICAgICAgICAgICBjbGlwX2ZpcnN0X2luKHRyaWFuZ2xlLnYyLCB0cmlhbmdsZS52MCwgdHJpYW5nbGUudjEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIC8vb3V0IGluIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHYyX291dCh0cmlhbmdsZSkpLy9vdXQgaW4gb3V0XHJcbiAgICAgICAgICAgICAgICBjbGlwX2ZpcnN0X2luKHRyaWFuZ2xlLnYxLCB0cmlhbmdsZS52MiwgdHJpYW5nbGUudjApO1xyXG4gICAgICAgICAgICBlbHNlIC8vIG91dCBpbiBpblxyXG4gICAgICAgICAgICAgICAgY2xpcF9maXJzdF9vdXQodHJpYW5nbGUudjAsIHRyaWFuZ2xlLnYxLCB0cmlhbmdsZS52Mik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSAvLyBpblxyXG4gICAge1xyXG4gICAgICAgIGlmICh2MV9vdXQodHJpYW5nbGUpKS8vIGluIG91dCBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2Ml9vdXQodHJpYW5nbGUpKS8vIGluIG91dCBvdXRcclxuICAgICAgICAgICAgICAgIGNsaXBfZmlyc3RfaW4odHJpYW5nbGUudjAsIHRyaWFuZ2xlLnYxLCB0cmlhbmdsZS52Mik7XHJcbiAgICAgICAgICAgIGVsc2UgLy8gaW4gb3V0IGluXHJcbiAgICAgICAgICAgICAgICBjbGlwX2ZpcnN0X291dCh0cmlhbmdsZS52MSwgdHJpYW5nbGUudjIsIHRyaWFuZ2xlLnYwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSAvLyBpbiBpblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHYyX291dCh0cmlhbmdsZSkpLy8gaW4gaW4gb3V0XHJcbiAgICAgICAgICAgICAgICBjbGlwX2ZpcnN0X291dCh0cmlhbmdsZS52MiwgdHJpYW5nbGUudjAsIHRyaWFuZ2xlLnYxKTtcclxuICAgICAgICAgICAgZWxzZSAvLyBpbiBpbiBpbiAobm8gY2xpcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdl9jbGlwWzBdID0gdHJpYW5nbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdl9jbGlwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0aEhlbHBlciB7XHJcbiAgICAvL+S/ruato+mZpOazlemMr+iqpFxyXG4gICAgc3RhdGljIGFjY0RpdihhcmcxOiBudW1iZXIsIGFyZzI6IG51bWJlcikge1xyXG4gICAgICAgIC8vY29kZSBmcm9tIGh0dHA6Ly84c3QuYmxvZ3Nwb3QudHcvMjAxMi8xMC9qc2J1Zy5odG1sXHJcbiAgICAgICAgbGV0IHQxID0gMCwgdDIgPSAwLCByMSwgcjI7XHJcbiAgICAgICAgdHJ5IHsgdDEgPSBhcmcxLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IH1cclxuICAgICAgICB0cnkgeyB0MiA9IGFyZzIudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoIH0gY2F0Y2ggKGUpIHsgfVxyXG5cclxuICAgICAgICByMSA9IE51bWJlcihhcmcxLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpXHJcbiAgICAgICAgcjIgPSBOdW1iZXIoYXJnMi50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKVxyXG4gICAgICAgIHJldHVybiAocjEgLyByMikgKiBNYXRoLnBvdygxMCwgdDIgLSB0MSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv67mraPliqDms5XpjK/oqqRcclxuICAgIHN0YXRpYyBhY2NBZGQoYXJnMTogbnVtYmVyLCBhcmcyOiBudW1iZXIpIHtcclxuICAgICAgICAvL2NvZGUgZnJvbSBodHRwOi8vOHN0LmJsb2dzcG90LnR3LzIwMTIvMTAvanNidWcuaHRtbFxyXG4gICAgICAgIGxldCByMSwgcjIsIG0sIGM7XHJcbiAgICAgICAgdHJ5IHsgcjEgPSBhcmcxLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IHIxID0gMCB9XHJcbiAgICAgICAgdHJ5IHsgcjIgPSBhcmcyLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB9IGNhdGNoIChlKSB7IHIyID0gMCB9XHJcbiAgICAgICAgYyA9IE1hdGguYWJzKHIxIC0gcjIpO1xyXG4gICAgICAgIG0gPSBNYXRoLnBvdygxMCwgTWF0aC5tYXgocjEsIHIyKSlcclxuICAgICAgICBpZiAoYyA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGNtID0gTWF0aC5wb3coMTAsIGMpO1xyXG4gICAgICAgICAgICBpZiAocjEgPiByMikge1xyXG4gICAgICAgICAgICAgICAgYXJnMSA9IE51bWJlcihhcmcxLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgYXJnMiA9IE51bWJlcihhcmcyLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpICogY207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcmcxID0gTnVtYmVyKGFyZzEudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSkgKiBjbTtcclxuICAgICAgICAgICAgICAgIGFyZzIgPSBOdW1iZXIoYXJnMi50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXJnMSA9IE51bWJlcihhcmcxLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgXCJcIikpO1xyXG4gICAgICAgICAgICBhcmcyID0gTnVtYmVyKGFyZzIudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoYXJnMSArIGFyZzIpIC8gbVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyDku6XliY3lr6vnmoRjb2RlXHJcbmV4cG9ydCBjbGFzcyBEcmF3SGVscGVyIHtcclxuXHJcbiAgICBzdGF0aWMgZHJhd0xpbmUob25lOiBWZWN0b3IyRCwgdHdvOiBWZWN0b3IyRCwgdmFsdWU6IFJHQkEsIGJ1ZmZlcjogQnVmZmVyMkQ8UkdCQT4pIHtcclxuXHJcbiAgICAgICAgbGV0IG5vdyA9IG9uZTtcclxuICAgICAgICBsZXQgdG8gPSB0d287XHJcbiAgICAgICAgbGV0IGRpZmYgPSBWZWN0b3IyRC5taW51cyh0bywgbm93KTtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXAgPSAxMDA7XHJcbiAgICAgICAgaWYgKGRpZmYueSA9PSAwKS8vaG9yaXpvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8v5bem55Wr5Yiw5Y+zXHJcbiAgICAgICAgICAgICAgICBub3cueCA9IG5vdy54ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmICghYnVmZmVyLmlzX2xlZ2FsX2luZGV4KG5vdy54LCBub3cueSkpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdy54ID4gdG8ueClcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXIuc2V0KG5vdy54LCBub3cueSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkaWZmLnggPT0gMCkvL3ZlcnRpY2FsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy/kuIrnlavliLDkuItcclxuICAgICAgICAgICAgICAgIG5vdy55ID0gbm93LnkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFidWZmZXIuaXNfbGVnYWxfaW5kZXgobm93LngsIG5vdy55KSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm93LnkgPiB0by55KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5zZXQobm93LngsIG5vdy55LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJhdGlvID0gZGlmZi54IC8gZGlmZi55O1xyXG4gICAgICAgIGxldCBhYnNfciA9IE1hdGguYWJzKHJhdGlvKTtcclxuXHJcbiAgICAgICAgaWYgKHJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoYWJzX3IgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBub3cueSA9IG5vdy55ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBub3cueCA9IG5vdy54ICsgYWJzX3I7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludFggPSBNYXRoLmZsb29yKG5vdy54KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci5pc19sZWdhbF9pbmRleChpbnRYLCBub3cueSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmlzX292ZXJfcG9zaXRpdmUobm93LngsIG5vdy55LCB0by54LCB0by55KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5zZXQoaW50WCwgbm93LnksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhYnNfciA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnkgPSBub3cueSArIDEgLyBhYnNfcjtcclxuICAgICAgICAgICAgICAgICAgICBub3cueCA9IG5vdy54ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW50WSA9IE1hdGguZmxvb3Iobm93LnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYnVmZmVyLmlzX2xlZ2FsX2luZGV4KG5vdy54LCBpbnRZKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIuaXNfb3Zlcl9wb3NpdGl2ZShub3cueCwgbm93LnksIHRvLngsIHRvLnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnNldChub3cueCwgaW50WSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJhdGlvIDwgMCkge1xyXG4gICAgICAgICAgICBpZiAoYWJzX3IgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBub3cueSA9IG5vdy55ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBub3cueCA9IG5vdy54IC0gYWJzX3I7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludFggPSBNYXRoLmZsb29yKG5vdy54KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci5pc19sZWdhbF9pbmRleChpbnRYLCBub3cueSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmlzX292ZXJfbmVnYXRpdmUobm93LngsIG5vdy55LCB0by54LCB0by55KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5zZXQoaW50WCwgbm93LnksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhYnNfciA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93LnkgPSBub3cueSArIDEgLyBhYnNfcjtcclxuICAgICAgICAgICAgICAgICAgICBub3cueCA9IG5vdy54IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW50WSA9IE1hdGguZmxvb3Iobm93LnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYnVmZmVyLmlzX2xlZ2FsX2luZGV4KG5vdy54LCBpbnRZKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIuaXNfb3Zlcl9uZWdhdGl2ZShub3cueCwgbm93LnksIHRvLngsIHRvLnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnNldChub3cueCwgaW50WSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd0NpcmNsZSh2YWx1ZTogUkdCQSwgYnVmZmVyOiBCdWZmZXIyRDxSR0JBPikge1xyXG4gICAgICAgIGxldCBpdCA9IDUwO1xyXG4gICAgICAgIGxldCBkZWx0YSA9IDIgKiBNYXRoLlBJIC8gaXQ7XHJcbiAgICAgICAgbGV0IFIgPSA5O1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSBuZXcgVmVjdG9yMkQoMTAsIDEwKTtcclxuICAgICAgICBsZXQgc3RhcnRUaGVkYSA9IC1NYXRoLlBJIC8gMztcclxuXHJcbiAgICAgICAgLy/nlavlnJNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vd1ggPSBNYXRoLmZsb29yKGNlbnRlci54ICsgUiAqIE1hdGguY29zKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIGkpKTtcclxuICAgICAgICAgICAgbGV0IG5vd1kgPSBNYXRoLmZsb29yKGNlbnRlci55ICsgUiAqIE1hdGguc2luKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIGkpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXh0WCA9IE1hdGguZmxvb3IoY2VudGVyLnggKyBSICogTWF0aC5jb3Moc3RhcnRUaGVkYSArIGRlbHRhICogKGkgKyAxKSkpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFkgPSBNYXRoLmZsb29yKGNlbnRlci55ICsgUiAqIE1hdGguc2luKHN0YXJ0VGhlZGEgKyBkZWx0YSAqIChpICsgMSkpKTtcclxuXHJcbiAgICAgICAgICAgIERyYXdIZWxwZXIuZHJhd0xpbmVXcmFwcGVyKG5ldyBWZWN0b3IyRChub3dYLCBub3dZKSwgbmV3IFZlY3RvcjJEKG5leHRYLCBuZXh0WSksIHZhbHVlLCBidWZmZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGRyYXdTdGFyKHZhbHVlOiBSR0JBLCBidWZmZXI6IEJ1ZmZlcjJEPFJHQkE+KSB7XHJcbiAgICAgICAgbGV0IGl0ID0gNTtcclxuICAgICAgICBsZXQgZGVsdGEgPSAyICogTWF0aC5QSSAvIGl0O1xyXG4gICAgICAgIGxldCBSID0gOTtcclxuICAgICAgICBsZXQgY2VudGVyID0gbmV3IFZlY3RvcjJEKDEwLCAxMCk7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGhlZGEgPSAtTWF0aC5QSSAvIDM7XHJcblxyXG4gICAgICAgIC8v55Wr5pif5pifXHJcbiAgICAgICAgbGV0IGsgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm93WCA9IE1hdGguZmxvb3IoY2VudGVyLnggKyBSICogTWF0aC5jb3Moc3RhcnRUaGVkYSArIGRlbHRhICogaykpO1xyXG4gICAgICAgICAgICBsZXQgbm93WSA9IE1hdGguZmxvb3IoY2VudGVyLnkgKyBSICogTWF0aC5zaW4oc3RhcnRUaGVkYSArIGRlbHRhICogaykpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5leHRYID0gTWF0aC5mbG9vcihjZW50ZXIueCArIFIgKiBNYXRoLmNvcyhzdGFydFRoZWRhICsgZGVsdGEgKiAoayArIDIpKSk7XHJcbiAgICAgICAgICAgIGxldCBuZXh0WSA9IE1hdGguZmxvb3IoY2VudGVyLnkgKyBSICogTWF0aC5zaW4oc3RhcnRUaGVkYSArIGRlbHRhICogKGsgKyAyKSkpO1xyXG5cclxuICAgICAgICAgICAgRHJhd0hlbHBlci5kcmF3TGluZVdyYXBwZXIobmV3IFZlY3RvcjJEKG5vd1gsIG5vd1kpLCBuZXcgVmVjdG9yMkQobmV4dFgsIG5leHRZKSwgdmFsdWUsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGsgPSBrICsgMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRyYXdMaW5lV3JhcHBlcih0MDogVmVjdG9yMkQsIHQxOiBWZWN0b3IyRCwgdmFsdWU6IFJHQkEsIGJ1ZmZlcjogQnVmZmVyMkQ8UkdCQT4pIHtcclxuICAgICAgICAvL+W+nuS4iuW+gOS4i+eVq1xyXG4gICAgICAgIGlmICh0MC55IDwgdDEueSlcclxuICAgICAgICAgICAgRHJhd0hlbHBlci5kcmF3TGluZSh0MCwgdDEsIHZhbHVlLCBidWZmZXIpO1xyXG4gICAgICAgIGVsc2UgaWYgKHQxLnkgPCB0MC55KVxyXG4gICAgICAgICAgICBEcmF3SGVscGVyLmRyYXdMaW5lKHQxLCB0MCwgdmFsdWUsIGJ1ZmZlcik7XHJcbiAgICAgICAgZWxzZSAvL+awtOW5s+e3mlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lvp7lt6blvoDlj7PnlatcclxuICAgICAgICAgICAgaWYgKHQwLnggPCB0MS54KVxyXG4gICAgICAgICAgICAgICAgRHJhd0hlbHBlci5kcmF3TGluZSh0MCwgdDEsIHZhbHVlLCBidWZmZXIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0MS54IDwgdDAueClcclxuICAgICAgICAgICAgICAgIERyYXdIZWxwZXIuZHJhd0xpbmUodDEsIHQwLCB2YWx1ZSwgYnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL1ZlY3RvclwiO1xyXG5pbXBvcnQgeyBkZWdyZWVfdG9fUmFkIH0gZnJvbSAnLi9Ub29sJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmb3JtIHtcclxuICAgIHhBeGlzOiBWZWN0b3I7XHJcbiAgICB5QXhpczogVmVjdG9yO1xyXG4gICAgekF4aXM6IFZlY3RvcjtcclxuICAgIHBvc2l0aW9uOiBWZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcih4QXhpczogVmVjdG9yLCB5QXhpczogVmVjdG9yLCB6QXhpczogVmVjdG9yLCBwb3NpdGlvbjogVmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy54QXhpcyA9IHhBeGlzO1xyXG4gICAgICAgIHRoaXMueUF4aXMgPSB5QXhpcztcclxuICAgICAgICB0aGlzLnpBeGlzID0gekF4aXM7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1Qb2ludCh0cmFuc2Zvcm06IFRyYW5zZm9ybSwgcG9pbnQ6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCB2ZWN0b3JYID0gdHJhbnNmb3JtLnhBeGlzLm11bHRpcGx5KHBvaW50LngpO1xyXG4gICAgICAgIGxldCB2ZWN0b3JZID0gdHJhbnNmb3JtLnlBeGlzLm11bHRpcGx5KHBvaW50LnkpO1xyXG4gICAgICAgIGxldCB2ZWN0b3JaID0gdHJhbnNmb3JtLnpBeGlzLm11bHRpcGx5KHBvaW50LnopO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtLnBvc2l0aW9uLmFkZCh2ZWN0b3JYKS5hZGQodmVjdG9yWSkuYWRkKHZlY3RvclopO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1WZWN0b3IodHJhbnNmb3JtOiBUcmFuc2Zvcm0sIHZlcnRleDogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IHZlY3RvclggPSB0cmFuc2Zvcm0ueEF4aXMubXVsdGlwbHkodmVydGV4LngpO1xyXG4gICAgICAgIGxldCB2ZWN0b3JZID0gdHJhbnNmb3JtLnlBeGlzLm11bHRpcGx5KHZlcnRleC55KTtcclxuICAgICAgICBsZXQgdmVjdG9yWiA9IHRyYW5zZm9ybS56QXhpcy5tdWx0aXBseSh2ZXJ0ZXgueik7XHJcblxyXG4gICAgICAgIHJldHVybiB2ZWN0b3JYLmFkZCh2ZWN0b3JZKS5hZGQodmVjdG9yWik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybVRyYW5zZm9ybSh0cmFuc2Zvcm06IFRyYW5zZm9ybSwgaW5wdXRUcmFuc2Zvcm06IFRyYW5zZm9ybSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKFxyXG4gICAgICAgICAgICBUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHRyYW5zZm9ybSwgaW5wdXRUcmFuc2Zvcm0ueEF4aXMpLFxyXG4gICAgICAgICAgICBUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHRyYW5zZm9ybSwgaW5wdXRUcmFuc2Zvcm0ueUF4aXMpLFxyXG4gICAgICAgICAgICBUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHRyYW5zZm9ybSwgaW5wdXRUcmFuc2Zvcm0uekF4aXMpLFxyXG4gICAgICAgICAgICBUcmFuc2Zvcm0udHJhbnNmb3JtUG9pbnQodHJhbnNmb3JtLCBpbnB1dFRyYW5zZm9ybS5wb3NpdGlvbiksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcm90YXRlQnlaKGRlZ3JlZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGRlZ3JlZV90b19SYWQoZGVncmVlKTtcclxuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZGlhbiksIHMgPSBNYXRoLnNpbihyYWRpYW4pO1xyXG4gICAgICAgIGxldCB4QXhpcyA9IG5ldyBWZWN0b3IoYywgcywgMCk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gbmV3IFZlY3RvcigtcywgYywgMCk7XHJcbiAgICAgICAgbGV0IHpBeGlzID0gbmV3IFZlY3RvcigwLCAwLCAxKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgIHhBeGlzLFxyXG4gICAgICAgICAgICB5QXhpcyxcclxuICAgICAgICAgICAgekF4aXMsXHJcbiAgICAgICAgICAgIFZlY3Rvci56ZXJvLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJvdGF0ZUJ5WShkZWdyZWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByYWRpYW4gPSBkZWdyZWVfdG9fUmFkKGRlZ3JlZSk7XHJcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWRpYW4pLCBzID0gTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgICAgICBsZXQgekF4aXMgPSBuZXcgVmVjdG9yKHMsIDAsIGMpO1xyXG4gICAgICAgIGxldCB4QXhpcyA9IG5ldyBWZWN0b3IoYywgMCwgLXMpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IG5ldyBWZWN0b3IoMCwgMSwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKFxyXG4gICAgICAgICAgICB4QXhpcyxcclxuICAgICAgICAgICAgeUF4aXMsXHJcbiAgICAgICAgICAgIHpBeGlzLFxyXG4gICAgICAgICAgICBWZWN0b3IuemVybyxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByb3RhdGVCeVgoZGVncmVlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcmFkaWFuID0gZGVncmVlX3RvX1JhZChkZWdyZWUpO1xyXG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkaWFuKSwgcyA9IE1hdGguc2luKHJhZGlhbik7XHJcbiAgICAgICAgbGV0IHhBeGlzID0gbmV3IFZlY3RvcigxLCAwLCAwKTtcclxuICAgICAgICBsZXQgeUF4aXMgPSBuZXcgVmVjdG9yKDAsIGMsIHMpO1xyXG4gICAgICAgIGxldCB6QXhpcyA9IG5ldyBWZWN0b3IoMCwgLXMsIGMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRyYW5zZm9ybShcclxuICAgICAgICAgICAgeEF4aXMsXHJcbiAgICAgICAgICAgIHlBeGlzLFxyXG4gICAgICAgICAgICB6QXhpcyxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigwLCAwLCAwKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBvZmZzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDAsIDApLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDAsIDEsIDApLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDAsIDAsIDEpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKHgsIHksIHopLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVHJhbnNmb3JtIGZyb20gJy4vVHJhbnNmb3JtJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3RvcidcclxuaW1wb3J0IFZlcnRleCBmcm9tICcuL1ZlcnRleCdcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XHJcbmltcG9ydCBQbGFuZSBmcm9tICcuL1BsYW5lJztcclxuaW1wb3J0IFJheSBmcm9tICcuL1JheSc7XHJcbmltcG9ydCBSYXN0ZXJpemVyIGZyb20gJy4vUmFzdGVyaXplcic7XHJcbmltcG9ydCBUZXh0dXJlMkQgZnJvbSAnLi9UZXh0dXJlMkQnO1xyXG5pbXBvcnQgeyBudW1iZXJfZXF1YWwgfSBmcm9tICcuL1Rvb2wnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJpYW5nbGUge1xyXG5cclxuICAgIC8vIOmAmeS6m+m7nnrpg73mmK8wXHJcbiAgICBzdGF0aWMgY2FsY3VsYXRlX86xX86yX86zKHMwOiBWZWN0b3IsIHMxOiBWZWN0b3IsIHMyOiBWZWN0b3IsIFA6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCBkaWZmID0gVmVjdG9yLm1pbnVzKFAsIHMwKTtcclxuXHJcbiAgICAgICAgLy8g5rGCcmF5KFAsUzAtUzIp5ZKMcmF5KFMwLFMxLVMyKeeahOS6pOm7nlxyXG4gICAgICAgIC8vIOetieWQjOaWvOaxgnJheShQLFMwLVMyKeWSjOW5s+mdoueahOS6pOm7nlxyXG4gICAgICAgIGxldCBkaXIwMSA9IFZlY3Rvci5taW51cyhzMSwgczApO1xyXG4gICAgICAgIGxldCBkaXIwMiA9IFZlY3Rvci5taW51cyhzMiwgczApO1xyXG4gICAgICAgIGxldCBuID0gbmV3IFZlY3RvcigtZGlyMDEueSwgZGlyMDEueCwgMCk7XHJcbiAgICAgICAgbGV0IHJheSA9IG5ldyBSYXkoUCwgZGlyMDIubXVsdGlwbHkoLTEpKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gUGxhbmUuaGl0KHJheSwgbmV3IFBsYW5lKHMwLCBuKSk7XHJcblxyXG4gICAgICAgIGlmICghcmVzdWx0KSB7IC8vIOmAgOWMluaIkOebtOe3mueahOS4ieinkuW9ouaJjeacieS5n+WPr+iDvVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5bmz6KGMJywgczAsIHMxLCBzMiwgUCk7XHJcblxyXG4gICAgICAgICAgICAvLyDkuI3omZXnkIZcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIM6xOiAxLCDOsjogMCwgzrM6IDAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwX29uX2RpcjAxID0gcmVzdWx0LmhpdF9wb3M7XHJcbiAgICAgICAgbGV0IHZlY3Rvcl/OsSA9IFZlY3Rvci5taW51cyhwX29uX2RpcjAxLCBzMCk7XHJcbiAgICAgICAgbGV0IHZlY3Rvcl/OsiA9IFZlY3Rvci5taW51cyhkaWZmLCB2ZWN0b3JfzrEpO1xyXG5cclxuICAgICAgICAvLyDmk4vmjolkaXIwMeOAgWRpcjAy5piveei7uOW5s+ihjOeahOaDheazgVxyXG4gICAgICAgIC8vIOa1rum7nuaVuOiri+eUqCBudW1iZXJfZXF1YWzvvIzkuI3nhLbmnINHR1xyXG4gICAgICAgIC8vIOimi+Wclu+8mmJ1Zy9mbG9hdF9wb2ludF9jb21wYWlyZV9lcnJvcihmaXhlZCkvYnVnX3doZW5fY2xpcHBpbmdfMi5qcGdcclxuICAgICAgICAvLyDlhbblr6bnlbbliJ3nm7TmjqXnlKjplbfluqbmr5TnrpfOseOAgc6y5LiN5piv5pu057Ch5Zau5ZeO77yfXHJcbiAgICAgICAgbGV0IM6xID0gbnVtYmVyX2VxdWFsKGRpcjAxLngsIDApID8gdmVjdG9yX86xLnkgLyBkaXIwMS55IDogdmVjdG9yX86xLnggLyBkaXIwMS54O1xyXG4gICAgICAgIGxldCDOsiA9IG51bWJlcl9lcXVhbChkaXIwMi54LCAwKSA/IHZlY3Rvcl/Osi55IC8gZGlyMDIueSA6IHZlY3Rvcl/Osi54IC8gZGlyMDIueDtcclxuICAgICAgICBpZiAoaXNOYU4ozrEpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZlY3Rvcl/OsS54LCBkaXIwMS54KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc05hTijOsikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codmVjdG9yX86yLngsIGRpcjAyLngpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgzrMgPSAxIC0gzrEgLSDOsjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgzrEsIM6yLCDOsyB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzX2luX3RyaWFuZ2xlKM6xOiBudW1iZXIsIM6yOiBudW1iZXIsIM6zOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gKM6xID49IDAgJiYgzrIgPj0gMCAmJiDOsyA+PSAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlm6DngrpjYWxjdWxhdGVfzrFfzrJfzrPlr6bkvZznmoTmlrnlvI/vvIzmiYDku6XpoIbluo/mmK/Os+OAgc6x44CBzrIg8J+YnVxyXG4gICAgc3RhdGljIGludGVycG9sYXRpb24ozrM6IG51bWJlciwgzrE6IG51bWJlciwgzrI6IG51bWJlciwgdjA6IG51bWJlciwgdjE6IG51bWJlciwgdjI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB2MCAqIM6zICsgdjEgKiDOsSArIHYyICogzrI7XHJcbiAgICB9XHJcblxyXG4gICAgdjA6IFZlcnRleDtcclxuICAgIHYxOiBWZXJ0ZXg7XHJcbiAgICB2MjogVmVydGV4O1xyXG4gICAgY29uc3RydWN0b3IocHYwOiBWZXJ0ZXgsIHB2MTogVmVydGV4LCBwdjI6IFZlcnRleCkge1xyXG4gICAgICAgIHRoaXMudjAgPSBwdjA7XHJcbiAgICAgICAgdGhpcy52MSA9IHB2MTtcclxuICAgICAgICB0aGlzLnYyID0gcHYyO1xyXG4gICAgICAgIHRoaXMudl9zID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB2X3M6IFZlY3RvcltdIHwgbnVsbDtcclxuICAgIHJhc3Rlcml6ZShwY2FtZXJhOiBDYW1lcmEsIHdvcmxkVHJhbnNmb3JtOiBUcmFuc2Zvcm0sIHRleHR1cmU6IFRleHR1cmUyRCkge1xyXG4gICAgICAgIHRoaXMudl9zID0gUmFzdGVyaXplci5wcm9jZXNzKHRoaXMsIHBjYW1lcmEsIHdvcmxkVHJhbnNmb3JtLCB0ZXh0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudl9zID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHRDb3VudCA9IHRoaXMudl9zLmxlbmd0aCAvIDM7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPD0gdENvdW50OyArK2MpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMyAqIGMgLSAxO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMudl9zW2luZGV4XS54LCB0aGlzLnZfc1tpbmRleF0ueSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy52X3NbaW5kZXggLSAyXS54LCB0aGlzLnZfc1tpbmRleCAtIDJdLnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHRoaXMudl9zW2luZGV4IC0gMV0ueCwgdGhpcy52X3NbaW5kZXggLSAxXS55KTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnZfc1tpbmRleF0ueCwgdGhpcy52X3NbaW5kZXhdLnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgbGVycCwgbnVtYmVyX2VxdWFsLCBjbGFtcCB9IGZyb20gJy4vVG9vbCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XHJcblxyXG4gICAgc3RhdGljIG1pbl9tYXgodjA6IFZlY3RvciwgdjE6IFZlY3RvciwgdjI6IFZlY3Rvcikge1xyXG5cclxuICAgICAgICBsZXQgbWluID0gbmV3IFZlY3RvcihNYXRoLm1pbihNYXRoLm1pbih2MC54LCB2MS54KSwgdjIueCksIE1hdGgubWluKE1hdGgubWluKHYwLnksIHYxLnkpLCB2Mi55KSwgTWF0aC5taW4oTWF0aC5taW4odjAueiwgdjEueiksIHYyLnopKTtcclxuICAgICAgICBsZXQgbWF4ID0gbmV3IFZlY3RvcihNYXRoLm1heChNYXRoLm1heCh2MC54LCB2MS54KSwgdjIueCksIE1hdGgubWF4KE1hdGgubWF4KHYwLnksIHYxLnkpLCB2Mi55KSwgTWF0aC5tYXgoTWF0aC5tYXgodjAueiwgdjEueiksIHYyLnopKTtcclxuICAgICAgICByZXR1cm4geyBtaW4sIG1heCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjYWxjdWxhdGVfbm9ybWFsKHYwOiBWZWN0b3IsIHYxOiBWZWN0b3IsIHYyOiBWZWN0b3IpIHtcclxuICAgICAgICBsZXQgdjAxID0gVmVjdG9yLm1pbnVzKHYxLCB2MCk7XHJcbiAgICAgICAgbGV0IHYwMiA9IFZlY3Rvci5taW51cyh2MiwgdjApO1xyXG4gICAgICAgIGxldCBub3JtYWwgPSBWZWN0b3IuY3Jvc3ModjAxLCB2MDIpO1xyXG4gICAgICAgIHJldHVybiBub3JtYWwubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNhbGN1bGF0ZV9jZW50ZXIodjA6IFZlY3RvciwgdjE6IFZlY3RvciwgdjI6IFZlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB2MC5hZGQodjEpLmFkZCh2MikubXVsdGlwbHkoMSAvIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1dih1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHUsIHYsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cCA9IG5ldyBWZWN0b3IoMCwgMSwgMCk7XHJcbiAgICBzdGF0aWMgemVybyA9IG5ldyBWZWN0b3IoMCwgMCwgMCk7XHJcblxyXG4gICAgc3RhdGljIHJlZmxlY3QoSTogVmVjdG9yLCBOOiBWZWN0b3IpIHtcclxuICAgICAgICBsZXQgTCA9IC0yICogVmVjdG9yLmRvdChJLCBOKVxyXG4gICAgICAgIHJldHVybiBOLm11bHRpcGx5KEwpLmFkZChJKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkKEE6IFZlY3RvciwgQjogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBuZXcgVmVjdG9yKEIueCArIEEueCwgQi55ICsgQS55LCBCLnogKyBBLnopO1xyXG4gICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG1pbnVzKEE6IFZlY3RvciwgQjogVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBuZXcgVmVjdG9yKEEueCAtIEIueCwgQS55IC0gQi55LCBBLnogLSBCLnopO1xyXG4gICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG11bHRpcGx5KEE6IFZlY3RvciwgczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBuZXcgVmVjdG9yKEEueCAqIHMsIEEueSAqIHMsIEEueiAqIHMpO1xyXG4gICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG11bHRpcGx5MyhBOiBWZWN0b3IsIEI6IFZlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKEEueCAqIEIueCwgQS55ICogQi55LCBBLnogKiBCLnopO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcm9zcyhBOiBWZWN0b3IsIEI6IFZlY3Rvcikge1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3RvcihBLnkgKiBCLnogLSBBLnogKiBCLnksIC1BLnggKiBCLnogKyBBLnogKiBCLngsIEEueCAqIEIueSAtIEEueSAqIEIueCk7XHJcbiAgICAgICAgcmV0dXJuIHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRvdChBOiBWZWN0b3IsIEI6IFZlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBBLnggKiBCLnggKyBBLnkgKiBCLnkgKyBBLnogKiBCLno7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGVxdWFsKEE6IFZlY3RvciwgQjogVmVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bWJlcl9lcXVhbChBLngsIEIueCkgJiYgbnVtYmVyX2VxdWFsKEEueSwgQi55KSAmJiBudW1iZXJfZXF1YWwoQS56LCBCLnopO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsZXJwKEE6IFZlY3RvciwgQjogVmVjdG9yLCB0OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcclxuICAgICAgICAgICAgbGVycChBLngsIEIueCwgdCksXHJcbiAgICAgICAgICAgIGxlcnAoQS55LCBCLnksIHQpLFxyXG4gICAgICAgICAgICBsZXJwKEEueiwgQi56LCB0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgeDogbnVtYmVyID0gMDtcclxuICAgIHk6IG51bWJlciA9IDA7XHJcbiAgICB6OiBudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IocHg6IG51bWJlciwgcHk6IG51bWJlciwgcHo6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHB4O1xyXG4gICAgICAgIHRoaXMueSA9IHB5O1xyXG4gICAgICAgIHRoaXMueiA9IHB6O1xyXG4gICAgfVxyXG5cclxuICAgIGNsYW1wX3gobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0gY2xhbXAodGhpcy54LCBtaW4sIG1heCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhbXBfeShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnkgPSBjbGFtcCh0aGlzLnksIG1pbiwgbWF4KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBsZW5ndGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnopO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm1hbGl6ZSgpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IHRoaXMubGVuZ3RoKCk7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy54IC8gdGVtcDtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLnkgLyB0ZW1wO1xyXG4gICAgICAgIHRoaXMueiA9IHRoaXMueiAvIHRlbXA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKEE6IFZlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBWZWN0b3IuYWRkKHRoaXMsIEEpO1xyXG4gICAgfVxyXG5cclxuICAgIG1pbnVzKEE6IFZlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBWZWN0b3IubWludXModGhpcywgQSk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkoczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5tdWx0aXBseSh0aGlzLCBzKTtcclxuICAgIH1cclxuXHJcbiAgICBuZWdhdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4gVmVjdG9yLm11bHRpcGx5KHRoaXMsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICBWZWN0b3IyRCgpIHtcclxuICAgICAgICB0aGlzLnogPSAwO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMkQge1xyXG5cclxuICAgIHN0YXRpYyBhZGQoQTogVmVjdG9yMkQsIEI6IFZlY3RvcjJEKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBuZXcgVmVjdG9yMkQoQi54ICsgQS54LCBCLnkgKyBBLnkpO1xyXG4gICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG1pbnVzKEE6IFZlY3RvcjJELCBCOiBWZWN0b3IyRCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IFZlY3RvcjJEKEEueCAtIEIueCwgQS55IC0gQi55KTtcclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwbHVzKHA6IFZlY3RvcjJEKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkoczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLnggKiBzLCB0aGlzLnkgKiBzKTtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gXCIoIFwiICsgdGhpcy54ICsgXCIgLCBcIiArIHRoaXMueSArIFwiIClcIjtcclxuICAgIH1cclxufSIsImltcG9ydCBWZWNvciBmcm9tIFwiLi9WZWN0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjREIHtcclxuICAgIHA6IFZlY29yO1xyXG4gICAgdzogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHA6IFZlY29yLCB3OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICB9XHJcbn07IiwiXHJcbmltcG9ydCB7IGxlcnAgfSBmcm9tICcuL1Rvb2wnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJ1xyXG5pbXBvcnQgVmVjdG9yNEQgZnJvbSAnLi9WZWN0b3I0RCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJ0ZXgge1xyXG4gICAgc3RhdGljIGJ1aWxkX3ZlcnRleChwOiBWZWN0b3IsIG46IFZlY3RvciwgdzogbnVtYmVyLCB1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB2ZXJ0ZXggPSBuZXcgVmVydGV4KHAsIG4sIHcsIHUsIHYpO1xyXG4gICAgICAgIHJldHVybiB2ZXJ0ZXg7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxlcnAodjA6IFZlcnRleCwgdjE6IFZlcnRleCwgdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHAgPSBWZWN0b3IubGVycCh2MC5wLCB2MS5wLCB0KTtcclxuICAgICAgICBsZXQgbiA9IFZlY3Rvci5sZXJwKHYwLm4sIHYxLm4sIHQpO1xyXG4gICAgICAgIGxldCB3ID0gbGVycCh2MC53LCB2MS53LCB0KTtcclxuICAgICAgICBsZXQgdSA9IGxlcnAodjAudSwgdjEudSwgdCk7XHJcbiAgICAgICAgbGV0IHYgPSBsZXJwKHYwLnYsIHYxLnYsIHQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVydGV4KHAsIG4sIHcsIHUsIHYpO1xyXG4gICAgfVxyXG5cclxuICAgIHA6IFZlY3RvcjtcclxuICAgIHc6IG51bWJlcjtcclxuICAgIHU6IG51bWJlcjtcclxuICAgIHY6IG51bWJlcjtcclxuICAgIG46IFZlY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwOiBWZWN0b3IsIG46IFZlY3RvciwgdzogbnVtYmVyLCB1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgdGhpcy5uID0gbjtcclxuICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgIHRoaXMudSA9IHU7XHJcbiAgICAgICAgdGhpcy52ID0gdjtcclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlcnRleCh0aGlzLnAuY2xvbmUoKSwgdGhpcy5uLmNsb25lKCksIHRoaXMudywgdGhpcy51LCB0aGlzLnYpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZV9wKHA6IFZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlX3codzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRfVmVjdG9yNEQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3I0RCh0aGlzLnAsIHRoaXMudyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRGlmZnVzZSBmcm9tIFwiLi4vTWF0ZXJhaWxzL0RpZmZ1c2VcIjtcclxuaW1wb3J0IEhpdGFibGUgZnJvbSBcIi4uL01hdGgvSGl0YWJsZVwiO1xyXG5pbXBvcnQgU2hhZGVyIGZyb20gXCIuLi9NYXRlcmFpbHMvU2hhZGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU5vZGUge1xyXG5cclxuICAgIHM6IFNoYWRlcjtcclxuICAgIGg6IEhpdGFibGU7XHJcbiAgICBjb25zdHJ1Y3RvcihzOiBTaGFkZXIsIGg6IEhpdGFibGUpIHtcclxuICAgICAgICB0aGlzLnMgPSBzO1xyXG4gICAgICAgIHRoaXMuaCA9IGg7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9NYXRoL1ZlY3RvcidcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL01hdGgvQ2FtZXJhJ1xyXG5pbXBvcnQgUmVjdCBmcm9tICcuL01hdGgvUmVjdCc7XHJcbmltcG9ydCBQbGFuZSBmcm9tICcuL01hdGgvUGxhbmUnO1xyXG5pbXBvcnQgU3BoZXJlIGZyb20gJy4vTWF0aC9TcGhlcmUnO1xyXG5pbXBvcnQgUmVuZGVyVGFyZ2V0IGZyb20gJy4vTWF0aC9SZW5kZXJUYXJnZXQnO1xyXG5pbXBvcnQgU2NlbmVOb2RlIGZyb20gJy4vT2JqZWN0L1NjZW5lTm9kZSc7XHJcbmltcG9ydCBEaWZmdXNlIGZyb20gJy4vTWF0ZXJhaWxzL0RpZmZ1c2UnO1xyXG5pbXBvcnQgTWlycm9yIGZyb20gJy4vTWF0ZXJhaWxzL01pcnJvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGl0ZVJheVRyYWNpbmdBcHAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIGxldCBmbG9vciA9IG5ldyBTY2VuZU5vZGUoRGlmZnVzZS53aGl0ZSwgbmV3IFJlY3QobmV3IFBsYW5lKFZlY3Rvci56ZXJvLCBWZWN0b3IudXApLCAxNiwgMTYpKVxyXG4gICAgICAgIGxldCBvYmpfbGlzdDogU2NlbmVOb2RlW10gPSBbZmxvb3JdO1xyXG4gICAgICAgIG9ial9saXN0LnB1c2gobmV3IFNjZW5lTm9kZShEaWZmdXNlLnllbGxvdywgbmV3IFNwaGVyZShuZXcgVmVjdG9yKDYsIDIsIC04KSwgMikpKTtcclxuICAgICAgICBvYmpfbGlzdC5wdXNoKG5ldyBTY2VuZU5vZGUoRGlmZnVzZS5ncmVlbiwgbmV3IFNwaGVyZShuZXcgVmVjdG9yKC02LCAyLCAtOCksIDIpKSk7XHJcbiAgICAgICAgb2JqX2xpc3QucHVzaChuZXcgU2NlbmVOb2RlKERpZmZ1c2UuYmx1ZSwgbmV3IFNwaGVyZShuZXcgVmVjdG9yKDAsIDIsIC0xMiksIDIpKSk7XHJcbiAgICAgICAgb2JqX2xpc3QucHVzaChuZXcgU2NlbmVOb2RlKERpZmZ1c2UueWVsbG93LCBuZXcgU3BoZXJlKG5ldyBWZWN0b3IoLTEwLCA2LCAwKSwgNikpKTtcclxuXHJcbiAgICAgICAgb2JqX2xpc3QucHVzaChuZXcgU2NlbmVOb2RlKG5ldyBNaXJyb3IoKSwgbmV3IFNwaGVyZShuZXcgVmVjdG9yKDAsIDIsIC0yKSwgMikpKTtcclxuICAgICAgICBvYmpfbGlzdC5wdXNoKG5ldyBTY2VuZU5vZGUobmV3IE1pcnJvcigpLCBuZXcgU3BoZXJlKG5ldyBWZWN0b3IoMTIsIDQsIC02KSwgNCkpKTtcclxuICAgICAgICBvYmpfbGlzdC5wdXNoKG5ldyBTY2VuZU5vZGUobmV3IE1pcnJvcigpLCBuZXcgU3BoZXJlKG5ldyBWZWN0b3IoOCwgNCwgMiksIDQpKSk7XHJcblxyXG4gICAgICAgIGxldCBTVyA9IDgwMDtcclxuICAgICAgICBsZXQgU0ggPSA2MDA7XHJcbiAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBDYW1lcmEobmV3IFZlY3RvcigwLCAyMCwgLTIwKSwgVmVjdG9yLnplcm8sIDYwLCBTVywgU0gsIDEsIDUwMCk7XHJcbiAgICAgICAgbGV0IHJlbmRlcl90YXJnZXQgPSBuZXcgUmVuZGVyVGFyZ2V0KFNXLCBTSCk7XHJcbiAgICAgICAgY2FtZXJhLnJlbmRlcihyZW5kZXJfdGFyZ2V0LCBvYmpfbGlzdCk7XHJcbiAgICAgICAgcmVuZGVyX3RhcmdldC5zaG93X2J1ZmZlcignY2FudmFzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBXaGl0ZVJheVRyYWNpbmdBcHAoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
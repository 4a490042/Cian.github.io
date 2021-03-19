var UIControl = /** @class */ (function () {
    function UIControl() {
        // this.CookieKey = "Languge";
        this.TempUI = {}; //Key:URL,Value:UIstr
        // this.cv_default = "Cht";
        // var Language = $.cookie(this.CookieKey);
        // if (!Language || Language == "null") {
        //     Language = this.cv_default;
        // }
        // this.GetLanguage(Language);
    }
    // UIControl.prototype.GetLanguage = function (Lan) {
    //     var _this = this;
    //     $.ajax({
    //         url: "./Language/" + Lan + ".json",
    //         type: 'GET',
    //         crossDomain: true,
    //         cache: false,
    //         async: false,
    //         success: function (re) {
    //             _this.cv_Language = re;
    //             return true;
    //         },
    //         error: function (xmlhttprequest, textstatus, message) {
    //             $.cookie(_this.CookieKey, null);
    //             alert("Get Language Error:" + Lan);
    //             if (_this.cv_default != Lan)
    //                 _this.GetLanguage(_this.cv_default);
    //             return false;
    //         }
    //     });
    // };
    // UIControl.prototype.SetLanguage = function (Language) {
    //     $.cookie(this.CookieKey, Language, { expires: 30 });
    //     window.location.reload();
    // };
    // ;
    UIControl.prototype.GetUI = function (Url) {
        var _this = this;
        var UI = null;
        if (!this.TempUI[Url]) {
            $.ajax({
                url: Url,
                type: 'GET',
                crossDomain: true,
                cache: false,
                async: false,
                success: function (re) {
                    UI = re;
                    _this.TempUI[Url] = UI;
                },
                error: function (xmlhttprequest, textstatus, message) {
                    alert("Get UI Error:" + Url);
                }
            });
        }
        else {
            UI = this.TempUI[Url];
        }
        if (!UI)
            return null;
        var Re = UI;
        var mach = Re.match(/\{\{(.*?)\}\}/g);
        var Keys = mach ? $.unique(mach) : [];
        for (var I in Keys) {
            var Key = Keys[I];
            var Val = this.cv_Language[Key.replace("{{", "").replace("}}", "")];
            if (!Val) {
                Val = "UI Err:" + Key.replace("{{", "").replace("}}", "");
            }
            Re = Re.replace(Key, Val);
        }
        return Re;
    };
    return UIControl;
}());

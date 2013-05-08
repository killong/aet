// ==UserScript==
// @name        AET
// @namespace   http://www.douban.com/wangbo87/
// @updateURL   https://github.com/killong/aet/raw/master/aet.user.js
// @description Advanced Edit Tool
// @require     http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.min.js
// @include     http://movie.douban.com/*
// @version     0.3
// ==/UserScript==

function aet() {

    // for subject IMDb
    $(document).ready(function () {
        SB_REG = /http:\/\/movie\.douban\.com\/subject\/\d{7,8}\//
        SBE_REG = /http:\/\/movie\.douban\.com\/subject\/\d{7,8}\/edit/

        // show subject IMDb link to text
        if (document.URL.match(SB_REG)) {
            sb_imdb = $(".article a[href*='imdb']")
            sb_imdb.after(function () {
                return "<span> " + sb_imdb.text() + "</span>"
            })
            $("#info a[href*='search']").attr("color","#888")
            $(".aside fieldset p.pl").has("a[href*=hd_link]").css("display",
                "none")
        }

        // show edit page Go to IMDb link
        if (document.URL.match(SBE_REG)) {
            sb_edit_imdb = $("#p_44[readonly]")
            site_link = $("#p_45[readonly]")
            cb_hidden = $(".celebrities input:hidden")


            sb_edit_imdb.after(function () {
                if (sb_edit_imdb.attr("value").substring(0, 2) == "tt") {
                    return '<a href="http://www.imdb.com/title/' + sb_edit_imdb
                        .attr(
                        "value") + '/" target="_balnk">Go to IMDb</a>'
                }
            })

            site_link.after(function () {
                if (site_link.attr("value").substring(0, 4) == "http") {
                    return '<a href="' + site_link.attr("value") +
                        '" target="_balnk">Site Link</a>'
                } else if (site_link.attr("value").length > 0) {
                    return '<a href="http://' + site_link.attr("value") +
                        '" target="_balnk">Site Link</a>'
                }
            })

            cb_hidden.after(function (idx) {
                if (cb_hidden[idx].value.length == 7) {
                    return '<a href="http://movie.douban.com/celebrity/' +
                        cb_hidden[idx].value +
                        '/" target="_balnk"><img src="http://img3.douban.com/pics/icon/cele_default_14_14.gif"></a>'
                }
            })

        }

    })

    // 替换中文括号为英文括号
    rdt = $("input[name='p_15'],input[name='p_17']")
    rdt.each(function () {
        $(this).blur(function () {
            this.value = this.value.replace("（", "(").replace("）", ")")
        })
    })

    // 时长信息修正
    $("input[name='p_119']").each(function () {
        $(this).blur(function () {
            if (isNaN(Number(this.value)) == false) {
                this.value = this.value + "分钟"
            }
            this.value = this.value.replace("mins", "分钟").replace("min", "分钟").replace(
                "鐘", "钟").replace(" ", "")
        })
    })

    // 官网去年前缀
    $("input[name='p_45']").each(function () {
        $(this).blur(function () {
            this.value = this.value.replace("http://", "")
        })
    })

}


function content_Eval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

content_Eval(aet);

$(document).ready( function() {

    // Cookies.remove('theme')
    // $('#menu-layer-2').css('height','0px')
    // $('#menu-layer-2').children().css('display','none')

    if (Cookies.get('theme') == null) {
        Cookies.set('theme','t0000')
    } else {
        var theme = Cookies.get('theme')
        var scheme = theme.charAt(1) + theme.charAt(2)
        switch (scheme) {
            case '01': // dark
                dark()
                $('.dark').html('Light mode')
                break
            case '10': // hc
                light_hc()
                $('.contrast').html('Low contrast')
                break
            case '11': // dark hc
                dark_hc()
                $('.dark').html('Light mode')
                $('.contrast').html('Low contrast')
                break
        }
        if (theme.charAt(3) == '1') { // set bold text
            $('link[id="fonts"]').attr('href','/styles/fonts-bold.css')
            $('.bold').html('Normal text')
        }
        if (theme.charAt(4) == '1') { // set large text
            large()
            $('.large').html('Smaller text')
        }
    }

    function dark() {
        $('link[id="main"]').attr('href','/styles/dark/main.css')
        $('link[id="blog"]').attr('href','/styles/dark/blog.css')
        $('link[id="index"]').attr('href','/styles/dark/index.css')
        $('link[id="article"]').attr('href','/styles/dark/article.css')
    }

    function light() {
        $('link[id="main"]').attr('href','/styles/light/main.css')
        $('link[id="blog"]').attr('href','/styles/light/blog.css')
        $('link[id="index"]').attr('href','/styles/light/index.css')
        $('link[id="article"]').attr('href','/styles/light/article.css')
    }

    function dark_hc() {
        $('link[id="main"]').attr('href','/styles/dark_hc/main.css')
        $('link[id="blog"]').attr('href','/styles/dark_hc/blog.css')
        $('link[id="index"]').attr('href','/styles/dark_hc/index.css')
        $('link[id="article"]').attr('href','/styles/dark_hc/article.css')
    }

    function light_hc() {
        $('link[id="main"]').attr('href','/styles/light_hc/main.css')
        $('link[id="blog"]').attr('href','/styles/light_hc/blog.css')
        $('link[id="index"]').attr('href','/styles/light_hc/index.css')
        $('link[id="article"]').attr('href','/styles/light_hc/article.css')
    }

    function regular() {
        $('link[id="main_size"]').attr('href','/styles/regular/main.css')
        $('link[id="blog_size"]').attr('href','/styles/regular/blog.css')
        $('link[id="index_size"]').attr('href','/styles/regular/index.css')
        $('link[id="article_size"]').attr('href','/styles/regular/article.css')
    }

    function large() {
        $('link[id="main_size"]').attr('href','/styles/large/main.css')
        $('link[id="blog_size"]').attr('href','/styles/large/blog.css')
        $('link[id="index_size"]').attr('href','/styles/large/index.css')
        $('link[id="article_size"]').attr('href','/styles/large/article.css')
    }

    var handled_contrast = false
    function contrast() {
        var theme = Cookies.get('theme')
        if (theme.charAt(1) == '0') {
            if (theme.charAt(2) == '1') {
                dark_hc()
            } else {
                light_hc()
            }
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 1) {
                    newTheme += '1'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.contrast').html('Low contrast')
        } else {
            if (theme.charAt(2) == '1') {
                dark()
            } else {
                light()
            }
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 1) {
                    newTheme += '0'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.contrast').html('High contrast')
        }
    }
    $('#nav').on('click touchstart', '.contrast', function(e) {
        if (e.type == 'touchstart') {
            $(this).off('click')
            handled_contrast = true
            contrast()
        } else if (e.type == 'click' && !handled_contrast) {
            contrast()
        } else {
            handled_contrast = false
        }
    })

    var handled_brightness = false
    function brightness() {
        var theme = Cookies.get('theme')
        if (theme.charAt(2) == '0') {
            if (theme.charAt(1) == '1') {
                dark_hc()
            } else {
                dark()
            }
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 2) {
                    newTheme += '1'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.dark').html('Light mode')
            // $('.dark').attr('value','Light mode')
        } else {
            if (theme.charAt(1) == '1') {
                light_hc()
            } else {
                light()
            }
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 2) {
                    newTheme += '0'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.dark').html('Dark mode')
            // $('.dark').attr('value','Dark mode')
        }
    }
    $('#nav').on('click touchstart', '.dark', function(e) {
        if (e.type == 'touchstart') {
            $(this).off('click')
            handled_brightness = true
            brightness()
        } else if (e.type == 'click' && !handled_brightness) {
            brightness()
        } else {
            handled_brightness = false
        }
    })

    var handled_weight = false
    function weight() {
        var theme = Cookies.get('theme')
        if (theme.charAt(3) == '0') {
            $('link[id="fonts"]').attr('href','/styles/fonts-bold.css')
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 3) {
                    newTheme += '1'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.bold').html('Normal text')
        } else {
            $('link[id="fonts"]').attr('href','/styles/fonts.css')
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 3) {
                    newTheme += '0'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.bold').html('Bolder text')
        }
    }
    $('#nav').on('click touchstart', '.bold', function(e) {
        if (e.type == 'touchstart') {
            $(this).off('click')
            handled_weight = true
            weight()
        } else if (e.type == 'click' && !handled_weight) {
            weight()
        } else {
            handled_weight = false
        }
    })

    var handled_size = false
    function size() {
        var theme = Cookies.get('theme')
        if (theme.charAt(4) == '0') {
            large()
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 4) {
                    newTheme += '1'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.large').html('Smaller text')
        } else {
            regular()
            var newTheme = ""
            for (i = 0; i <= 5; i++) {
                if (i == 4) {
                    newTheme += '0'
                } else {
                    newTheme += theme.charAt(i)
                }
            }
            Cookies.set('theme',newTheme)
            $('.large').html('Larger text')
        }
    }
    $('#nav').on('click touchstart', '.large', function(e) {
        if (e.type == 'touchstart') {
            $(this).off('click')
            handled_size = true
            size()
        } else if (e.type == 'click' && !handled_size) {
            size()
        } else {
            handled_size = false
        }
    })

})

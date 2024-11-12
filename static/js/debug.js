function set_debug_backgrounds(){
    let debug_sections = {
        'header':'orange',
        'banner':'red',
        'left-aside':'green',
        'main':'royalblue',
        'right-aside':'orange',
        'low-content':'green',
        'footer':'blue'
    };

    const debug_keys = Object.keys(debug_sections);
    for (let i = 0; i < debug_keys.length; i++){
        document.getElementsByClassName(debug_keys[i])[0].style.backgroundColor = debug_sections[debug_keys[i]]
    }
}

set_debug_backgrounds();
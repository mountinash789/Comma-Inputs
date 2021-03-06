function update_comma_fields() {
    // need to be called when the inputs have been updated programmatically
    document.querySelectorAll('.comma-number-field').forEach((item) => {
        item.dispatchEvent(new Event('change'));
    });
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.comma-number-field').forEach((item) => {
        var wrapper = item.cloneNode(true);
        item.style.display = "none";
        wrapper.setAttribute('type', 'text');
        wrapper.dataset.targetId = item.id;
        wrapper.id = '';
        item.parentNode.insertBefore(wrapper, item);
        wrapper.value = comma_convert(item.value);

        item.addEventListener('change', (e) => {
            wrapper.value = comma_convert(e.target.value);
        });

        wrapper.addEventListener('input', (e) => {
            let raw = e.target.value.replace(/,/g, '')
            if (isNaN(raw) || raw.length === 0) {
                e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            }
        });

        wrapper.addEventListener('focusout', (e) => {
            if (!isNaN(e.target.value.replace(/,/g, ''))) {
                e.target.value = comma_convert(e.target.value);
            }

            main_el = document.querySelector(`#${e.target.dataset.targetId}`);
            main_el.value = e.target.value.replace(/,/g, '');
        });
    });

    function comma_convert(value) {
        var config = {};
        if (value.replace(/,/g, '').split('.', 2).length > 1) {
            config = {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            };
        }
        if (/^[0-9.,]+$/.test(value)) {
            value = parseFloat(
                value.replace(/,/g, '')
            ).toLocaleString('en', config);
        }
        return value;
    }
}, false);

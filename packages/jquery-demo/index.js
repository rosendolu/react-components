function log(...args) {
    console.log(`[${new Date().toLocaleTimeString()}]:`, ...args);
}
$(document).ready(() => {
    log('dom ready');
});

$('#submitBtn').on('click', function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    const formData = $('form').serializeArray();
    const username = $('#username').val();
    const password = $('#password').val();
    log({ username, password, formData });
    // log('submitted successfully!');

    for (let { name, value } of formData) {
        if (!value) {
            // alert(`${name} can not be empty!`);
            $(`#${name}`).trigger('focus');

            $('#result').html(`<p style="color: red;">${name} fields are required.</p>`);
            return;
        }
    }

    var $submitBtn = $(this);
    // 启动加载动画
    $submitBtn.addClass('loading');
    $.ajax({
        url: 'https://example.com/submit',
        type: 'POST',
        data: JSON.stringify({
            username: username,
            password: password,
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            // 成功后的操作
            $('#result').html('<p style="color: green;">Form submitted successfully!</p>');
            // 恢复按钮样式
            $submitBtn.removeClass('loading');
        },
        error: function (err) {
            log('ajax error', err?.statusText);
            // 出错后的操作
            $('#result').html('<p style="color: red;">There was an error submitting the form.</p>');
            // 恢复按钮样式
            $submitBtn.removeClass('loading');
        },
    });
});

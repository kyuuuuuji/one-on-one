var forest
var mentor
var needToReserve
var day
var startTime
var endTime
var mentee
var needMeetingRoom
var month
var dayOfWeek

var requestMessage


$(function () {
    var clipboard = new Clipboard('.copy');
    var date_count = 0;
    $('#date_count').change(function () {
        var current_date_count = $('#date_count').val()
        if (date_count > current_date_count) {
            // 数字が減ったとき
            $('.schedule' + date_count).remove()
        } else {
            $('#schedule').clone()
            .appendTo("#schedules")
            .removeClass('template')
            .addClass('schedule' + current_date_count)
        }
        date_count = current_date_count
    })

    $('#form').submit(function (event) {
        event.preventDefault()
        mentor = $('#mentor').val()
        forest = $('#forest').val()
        var message = ""
        needToReserve = false
        requestMessage = ''
    $('#schedules').children('#schedule').each(function() {
            mentee = $(this).find('#mentee').val()
            needMeetingRoom = '不要'
            if ($(this).find('#meeting_room option:selected').val() == 'true') {
                needToReserve = true
                needMeetingRoom = '要'
            }
            var inputDate = new Date($(this).find('#day').val())
            startTime = $(this).find('#start_time').val()
            endTime = $(this).find('#end_time').val()
            month = inputDate.getMonth() + 1
            day = inputDate.getDate()
            dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土" ][inputDate.getDay()]
            message += getLoopTemplate()
        });

        console.log(needToReserve)
        if (needToReserve == true) {
            requestMessage = '会議室の予約をお願いいたします。'
        }

        $('#result_subject').val(getMailSubject())
        $('#result_content').val(getHeaderTemplate() + message + getFooterTemplate())

    })

})

function getMailSubject() {
    return `【共有&依頼】1on1面談(${mentor})`
}

function getHeaderTemplate() {
    return `
${forest}さん

お疲れ様です。${mentor}です。

1on1日程について、以下の日程で実施しますので共有します。
${requestMessage}

──────────────
`
}

function getLoopTemplate() {
    return `
日時　　　：　${month}/${day}(${dayOfWeek}) ${startTime}~${endTime}
メンター　：　${mentor}
メンティー：　${mentee}
会議室　　：　${needMeetingRoom}
──────────────

`
}

function getFooterTemplate() {
    return `よろしくお願いいたします。`
}

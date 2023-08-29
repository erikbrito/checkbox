var idCounter = 1

  var list = {
    'Richard Paul M.': {
      'Luis F. Doris': {
        'Maurice Rudolf Ludwig': {
          'Joseph E. James A.': { 'Alan G. William': '' },
          'Guglielmo Hendrik Antoon': '',
          'Wladyslaw Stanislaw Ivar': '',
          'Elie Melvin': '',
          'Alvin E. Emil Theodor': '',
          'Heike Norman E.': '',
        },
        'Kurt Dickinson W.': '',
        'Finn E. MAy-Britt': '',
        'James A. Shimon': ''
      }
    }
  }

  function createCheckboxTree(parent, items) {
    var ul = $("<ul>")

    $.each(items, function(key, value) {
      var li = $("<li>")
      var checkboxId = "checkbox-" + idCounter++
      $('<input type="checkbox" class="checkbox">').attr("id", checkboxId).appendTo(li)

      $("<label class='custom-checkbox'>").attr("for", checkboxId).appendTo(li)
      if (key === "Richard" || key === "Luis") {
        $("<span class='line-horizontal-main'></span>").appendTo(li)
      } else if (key === "Maurice") {
        $("<span class='line-horizontal-Maurice'></span>").appendTo(li)
      } else if (key === "Joseph") {
        $("<span class='line-horizontal-Joseph'></span>").appendTo(li)
      } else {
        $("<span class='line-horizontal'></span>").appendTo(li)
      }

      $("<span class='line'></span>").appendTo(li)
      $("<span>").text(key).appendTo(li)
      li.appendTo(ul)

      if (typeof value === "object" && !$.isEmptyObject(value)) {
        createCheckboxTree(li, value)
      }

    })
    ul.appendTo(parent)
  }

  $(document).ready(function() {
    createCheckboxTree($("#checkboxTree"), list)

    $(".checkbox").each(function() {
      var checkboxId = $(this).attr("id")
      var state = localStorage.getItem(checkboxId)
      
      if (state === "indeterminate") {
        $(this).prop("indeterminate", true)
      } else {
        $(this).prop("checked", state === "true")
      }
    })

    $(".checkbox").change(function() {
      var checkboxId = $(this).attr("id")
      var isChecked = $(this).is(":checked")

      if (checkboxId === "checkbox-1") {
        var isChecked = $(this).is(":checked")
        $(".checkbox").prop("checked", isChecked)

      } else if (checkboxId.startsWith("checkbox-2")) {
        var isChecked = $(this).is(":checked")
        $(".checkbox").prop("checked", isChecked)
        $("#checkbox-1").prop("indeterminate", isChecked)

      } else if (checkboxId.startsWith("checkbox-3")) {
        var isChecked = $(this).is(":checked")
        $("#checkbox-1, #checkbox-2").prop("indeterminate", isChecked)
        $("#checkbox-3, #checkbox-4, #checkbox-5, #checkbox-6, #checkbox-7, #checkbox-8, #checkbox-9, #checkbox-10").prop("checked", isChecked)
      
      } else if (checkboxId.startsWith("checkbox-4")) {
        var isChecked = $(this).is(":checked")
        $("#checkbox-1, #checkbox-2, #checkbox-3").prop("indeterminate", isChecked)
        $("#checkbox-1, #checkbox-2, #checkbox-3, #checkbox-4, #checkbox-5").prop("checked", isChecked)
     
      } else if (checkboxId.startsWith("checkbox-5")) {
        var isChecked = $(this).is(":checked")
        $("#checkbox-1, #checkbox-2, #checkbox-3, #checkbox-4").prop("indeterminate", isChecked)
      
      } else if (checkboxId.startsWith("checkbox-6") || checkboxId.startsWith("checkbox-7") || checkboxId.startsWith("checkbox-8") || checkboxId.startsWith("checkbox-9") || checkboxId.startsWith("checkbox-10")) {
        var isChecked = $(this).is(":checked")
        $("#checkbox-1, #checkbox-2, #checkbox-3").prop("indeterminate", isChecked)
      }
       else if (checkboxId.startsWith("checkbox-11") || checkboxId.startsWith("checkbox-12") || checkboxId.startsWith("checkbox-13")) {
        var isChecked = $(this).is(":checked")
        $("#checkbox-1, #checkbox-2").prop("indeterminate", isChecked)
      
      } else {
        if ($(this).is(":checked")) {
          $(this).parents("li").find(".checkbox").not(".no-mark").prop("checked", true)
        }
      }

      $(".checkbox").each(function() {
        var checkboxId = $(this).attr("id")
        var isChecked = $(this).is(":checked")
        var isIndeterminate = $(this).prop("indeterminate")

        if (isIndeterminate) {
          localStorage.setItem(checkboxId, "indeterminate")
        } else {
          localStorage.setItem(checkboxId, isChecked)
        }
      })
    })

    $("#clearLocalStorage").click(function() {
      $(".checkbox").prop("checked", false)
      $(".checkbox").prop("indeterminate", false)

      localStorage.clear()
    })
  })
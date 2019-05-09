$(document).ready(function() {
  /*************************
    JOB ROLE SECTION
   *************************/

  const $titleDropdown = $('#title');
  const $otherInput = $('#other-job');
  $otherInput.hide();

  $titleDropdown.change(function() {
    if ($titleDropdown.val() === 'other') {
      $otherInput.show();
    } else {
      $otherInput.hide();
    }
  });

  /*************************
    TSHIRT INFO SECTION
   *************************/

  const $designDropdown = $('#design');
  const $colorDropdown = $('#color');
  $colorDropdown.parent().hide();

  $designDropdown.change(function() {
    if ($(this).val() === 'js puns') {
      $colorDropdown.parent().show();
      $colorDropdown.val('cornflowerblue').focus();
      $colorDropdown.children('option:contains("JS Puns")').show();
      $colorDropdown.children('option:contains("JS shirt")').hide();
    } else if ($(this).val() === 'heart js') {
      $colorDropdown.parent().show();
      $colorDropdown.val('tomato').focus();
      $colorDropdown.children('option:contains("JS Puns")').hide();
      $colorDropdown.children('option:contains("JS shirt")').show();
    } else {
      $colorDropdown.parent().hide();
    }
  });

  /*************************
    REGISTER FOR ACTIVITIES SECTION
   *************************/

  const $activities = $('.activities input[type="checkbox"]');
  let total = 0;
  const $totalCounter = '<span id="total-counter"></span>';
  $('.activities').append($totalCounter);

  for (let i = 0; i < $activities.length; i++) {
    if (i === 0) {
      $($activities[i]).val(200);
    } else {
      $($activities[i]).val(100);
    }
  }

  const disableClashing = (initialEvent, clashingEvent) => {
    if ($(`[name="${initialEvent}"]`).is(':checked')) {
      $(`[name="${clashingEvent}"]`).attr('disabled', true);
      $(`[name="${clashingEvent}"]`)
        .parent()
        .css('color', 'gray');
    } else {
      $(`[name="${clashingEvent}"]`).attr('disabled', false);
      $(`[name="${clashingEvent}"]`)
        .parent()
        .css('color', '');
    }
  };

  $activities.change(function() {
    if ($(this).is(':checked')) {
      total += parseInt($(this).val());
    } else if (!$(this).is(':checked')) {
      total -= parseInt($(this).val());
    }
    if (total <= 0) {
      $('#total-counter').hide();
    } else {
      $('#total-counter').show();
      $('#total-counter').text(`Total: $${total}`);
    }

    disableClashing('js-frameworks', 'express');
    disableClashing('js-libs', 'node');
    disableClashing('express', 'js-frameworks');
    disableClashing('node', 'js-libs');
  });

  /*************************
    PAYMENT INFO SECTION
   *************************/

  $paymentDropdown = $('#payment');
  $creditcardDiv = $('#credit-card');
  $paypalDiv = $creditcardDiv.next();
  $bitcoinDiv = $paypalDiv.next();

  $paypalDiv.hide();
  $bitcoinDiv.hide();

  $('[value="credit card"]').attr('selected', true);
  $('[value="select_method').attr('disabled', true);

  $paymentDropdown.change(function(event) {
    if ($(this).val() === 'credit card') {
      $creditcardDiv.show();
      $paypalDiv.hide();
      $bitcoinDiv.hide();
    }
    if ($(this).val() === 'paypal') {
      $creditcardDiv.hide();
      $paypalDiv.show();
      $bitcoinDiv.hide();
    }
    if ($(this).val() === 'bitcoin') {
      $creditcardDiv.hide();
      $paypalDiv.hide();
      $bitcoinDiv.show();
    }
  });

  /*************************
    FORM VALIDATION
   *************************/

  const validateName = () => {
    const isEmpty = /^\s*$/;
    if (!isEmpty.test($('#name').val())) {
      return true;
    }
    $('#name').css('border', 'red 3px solid');
    $('#name').attr('placeholder', 'Please enter a valid name..');
    return false;
  };

  const validateMail = () => {
    const isMail = /^\w+@\w+\.\w+$/;
    if (isMail.test($('#mail').val())) {
      return true;
    }
    $('#mail').css('border', 'red 3px solid');
    $('#mail').attr('placeholder', 'Please enter a valid e-mail..');
    return false;
  };

  const validateActivities = () => {
    if ($('.activities input:checkbox:checked').length > 0) {
      return true;
    }
    $('.activities').css('border', '3px solid red');
    return false;
  };

  const validateCreditcard = () => {
    const isCreditcard = /^\d{13,16}$/;
    const isZip = /^\d{5}$/;
    const isCVV = /^\d{3}$/;

    if ($paymentDropdown.val() === 'credit card') {
      if (isCreditcard.test($('#cc-num').val())) {
        if (isZip.test($('#zip').val())) {
          if (isCVV.test($('#cvv').val())) return true;
        }
      }
    } else if ($paymentDropdown.val() !== 'credit card') {
      return true;
    }

    return false;
  };

  $('form').submit(function(event) {
    const name = validateName();
    const mail = validateMail();
    const activities = validateActivities();
    const creditcard = validateCreditcard();

    if (
      validateName() &&
      validateMail() &&
      validateActivities() &&
      validateCreditcard()
    ) {
      alert('Submitted..');
    } else {
      event.preventDefault();
    }
  });
});

$(document).ready(function() {
  /*************************
    JOB ROLE SECTION
   *************************/

  const $titleDropdown = $('#title');
  const $otherInput = $('#other-job');
  $otherInput.hide();

  // Change event handler that enables "other jobs" input field if selected.
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

  // Change event handler that shows and hides T-Shirts according to design selected.
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

  // Applying a dollar value to each activitiy.
  for (let i = 0; i < $activities.length; i++) {
    if (i === 0) {
      $($activities[i]).val(200);
    } else {
      $($activities[i]).val(100);
    }
  }

  // Function makes sure clashing events are disabled.
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

  // Change event handler for the checkboxes to track total value
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

    // Calling the disableClashing function to disable clashing events.
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

  // Hiding non-default options.
  $paypalDiv.hide();
  $bitcoinDiv.hide();

  // Setting credit card as the default option.
  $('[value="credit card"]').attr('selected', true);
  $('[value="select_method').attr('disabled', true);

  // Change event handler to show and hide correct payment information depending on user selection.
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

  // Function that validates name input with a regex check
  const validateName = () => {
    const isEmpty = /^\s*$/;
    if (isEmpty.test($('#name').val())) {
      $('#name').css('border', 'red 1px solid');
      $('#name').attr('placeholder', 'Please enter a valid name..');
      return false;
    } else {
      $('#name').css('border', '');
      $('#name').attr('placeholder', '');
      return true;
    }
    return false;
  };

  // Function that validates email input with a regex check
  const validateMail = () => {
    const isMail = /^\w+@\w+\.\w+$/;
    if (!isMail.test($('#mail').val())) {
      $('#mail').css('border', 'red 1px solid');
      $('#mail').attr('placeholder', 'Please enter a valid e-mail..');
      return false;
    } else {
      $('#mail').css('border', 'none');
      $('#mail').attr('placeholder', '');
      return true;
    }
    return false;
  };

  // Function that validates that at least one activity is selected.
  const validateActivities = () => {
    if ($('.activities input:checkbox:checked').length <= 0) {
      $('.activities').css('border', '1px solid red');
      return false;
    } else {
      $('.activities').css('border', '');
      return true;
    }

    return false;
  };

  // Function that checks whether all credit card fields are valid and credit card is the preferred method of payment.
  const validateCreditcard = () => {
    const isCreditcard = /^\d{13,16}$/;
    const isZip = /^\d{5}$/;
    const isCVV = /^\d{3}$/;
    let isValid = false;

    if ($paymentDropdown.val() !== 'credit card') {
      return true;
    }

    if ($paymentDropdown.val() === 'credit card') {
      console.log('first if passed');
      if (!isCreditcard.test($('#cc-num').val())) {
        $('#cc-num').css('border', '1px solid red');
        $('#cc-num').attr('placeholder', 'Invalid credit card number..');
        isValid = false;
      } else {
        $('#cc-num').css('border', 'none');
        $('#cc-num').attr('placeholder', '');
        isValid = true;
      }
      if (!isZip.test($('#zip').val())) {
        $('#zip').css('border', '1px solid red');
        $('#zip').attr('placeholder', 'Invalid zip..');
        isValid = false;
      } else {
        $('#zip').css('border', '');
        $('#zip').attr('placeholder', '');
        isValid = true;
      }
      if (!isCVV.test($('#cvv').val())) {
        $('#cvv').css('border', '1px solid red');
        $('#cvv').attr('placeholder', 'Invalid CVV');
        isValid = false;
      } else {
        $('#cvv').css('border', '');
        $('#cvv').attr('placeholder', '');
        isValid = true;
      }
    }
    return isValid;
  };

  // Submit event handler that makes sure all validation functions pass before submitting.
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

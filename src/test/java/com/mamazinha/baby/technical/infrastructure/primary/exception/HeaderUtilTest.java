package com.mamazinha.baby.technical.infrastructure.primary.exception;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import com.mamazinha.baby.UnitTest;

@UnitTest
class HeaderUtilTest {

  @Test
  void shouldCreateFailureAlertWithTranslation() {
    HttpHeaders headers = HeaderUtil.createFailureAlert("myApp", "User", "404");

    assertThat(headers.getFirst("X-myApp-error")).isEqualTo("error.404");
    assertThat(headers.getFirst("X-myApp-params")).isEqualTo("User");
  }
}

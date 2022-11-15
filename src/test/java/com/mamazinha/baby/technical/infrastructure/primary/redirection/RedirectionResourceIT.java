package com.mamazinha.baby.technical.infrastructure.primary.redirection;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import com.mamazinha.baby.IntegrationTest;

@IntegrationTest
@AutoConfigureMockMvc
class RedirectionResourceIT {

  @Autowired
  MockMvc mockMvc;

  @Test
  void shouldGetViewForForwarding() throws Exception {
    mockMvc.perform(get("/dummy")).andExpect(status().isOk()).andExpect(view().name("forward:/"));
  }
}

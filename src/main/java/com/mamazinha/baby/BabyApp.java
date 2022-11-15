package com.mamazinha.baby;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import com.mamazinha.baby.common.domain.Generated;

@SpringBootApplication
@Generated(reason = "Not testing logs")
public class BabyApp {

  private static final Logger log = LoggerFactory.getLogger(BabyApp.class);

  public static void main(String[] args) {
    Environment env = SpringApplication.run(BabyApp.class, args).getEnvironment();

    if (log.isInfoEnabled()) {
      log.info(ApplicationStartupTraces.of(env));
    }
  }
}

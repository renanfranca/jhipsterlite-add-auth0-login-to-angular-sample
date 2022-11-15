package com.mamazinha.baby.pagination.domain;

import java.util.List;

import com.mamazinha.baby.pagination.domain.BabyPage.BabyPageBuilder;

public final class BabyPagesFixture {

  private BabyPagesFixture() {}

  public static BabyPage<String> page() {
    return pageBuilder().build();
  }

  public static BabyPageBuilder<String> pageBuilder() {
    return BabyPage.builder(List.of("test")).currentPage(2).pageSize(10).totalElementsCount(21);
  }
}

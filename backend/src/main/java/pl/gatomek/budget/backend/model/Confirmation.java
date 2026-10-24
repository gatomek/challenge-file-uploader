package pl.gatomek.budget.backend.model;

import lombok.RequiredArgsConstructor;

import java.time.Instant;

@RequiredArgsConstructor
public class Confirmation {
    private final Instant instant;
}

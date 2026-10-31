package pl.gatomek.budget.backend.service;

import org.springframework.stereotype.Service;
import pl.gatomek.budget.backend.model.Confirmation;

import java.time.Instant;

@Service
class RecipeServiceImpl implements RecipeService {
    public Confirmation makeConfirmation() {
        return new Confirmation(Instant.now());
    }
}

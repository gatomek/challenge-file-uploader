package pl.gatomek.budget.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.gatomek.budget.backend.model.Confirmation;
import pl.gatomek.budget.backend.model.Message;
import pl.gatomek.budget.backend.service.RecipeService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping(path = "/recipe", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Confirmation makeRecipe(@RequestPart(name = "message") Message message,
                                   @RequestPart(name = "file") List<MultipartFile> file) {
        return recipeService.makeRecipe();
    }
}

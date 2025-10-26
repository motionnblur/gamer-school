package com.example.server.dto.user.userpath;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserPathDto {
    private List<Path> selectedPaths;
    private List<Master> selectedMasters;
}

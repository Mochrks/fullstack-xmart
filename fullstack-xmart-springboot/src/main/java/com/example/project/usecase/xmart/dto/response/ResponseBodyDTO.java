package com.example.project.usecase.xmart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseBodyDTO {
	private long total;
	private Object data;
	private String message;
	private int statusCode;
	private String status;
}

package com.expense_tracker.dto;

import com.expense_tracker.model.Transaction;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardDto {
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal balance;
    private List<Transaction> recentTransactions;
    private Map<String, BigDecimal> categorySummary;
}

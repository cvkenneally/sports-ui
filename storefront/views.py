from django.shortcuts import render
from django.template import TemplateDoesNotExist
from django.http import JsonResponse
from datetime import datetime

def welcome(request):
    return render(request, 'welcome.html')  # No 'storefront/' prefix now


def scores(request):
    scores_data = [
        {"team1": "Team A", "team1_score": "102", "team2": "Team B", "team2_score": "98", "time_remaining": "3:45 Q4", "sport": "basketball", "date": "2024-09-18"},
        {"team1": "Team C", "team1_score": "115", "team2": "Team D", "team2_score": "110", "time_remaining": "Final", "sport": "football", "date": "2024-09-17"},
        {"team1": "Team E", "team1_score": "89", "team2": "Team F", "team2_score": "91", "time_remaining": "2:12 Q3", "sport": "basketball", "date": "2024-09-17"},
        {"team1": "Team G", "team1_score": "1", "team2": "Team H", "team2_score": "0", "time_remaining": "87'", "sport": "soccer", "date": "2024-09-18"},
    ]

    return render(request, 'scores.html', {"scores": scores_data})

def get_scores(request):
    # Get the selected date from the query parameters
    selected_date = request.GET.get('date', None)

    # Example dataset with dates
    scores_data = [
        {"team1": "Team A", "team1_score": "102", "team2": "Team B", "team2_score": "98", "time_remaining": "3:45 Q4", "sport": "basketball", "date": "2024-09-18"},
        {"team1": "Team C", "team1_score": "115", "team2": "Team D", "team2_score": "110", "time_remaining": "Final", "sport": "football", "date": "2024-09-17"},
        {"team1": "Team E", "team1_score": "89", "team2": "Team F", "team2_score": "91", "time_remaining": "2:12 Q3", "sport": "basketball", "date": "2024-09-17"},
        {"team1": "Team G", "team1_score": "1", "team2": "Team H", "team2_score": "0", "time_remaining": "87'", "sport": "soccer", "date": "2024-09-18"},
    ]

    # Filter the games based on the selected date, if provided
    if selected_date:
        filtered_scores = [score for score in scores_data if score['date'] == selected_date]
    else:
        filtered_scores = scores_data  # Default: show all scores if no date is selected

    return JsonResponse({"scores": filtered_scores})
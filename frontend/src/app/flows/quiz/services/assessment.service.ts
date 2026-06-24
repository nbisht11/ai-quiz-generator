import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question.interface';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OPTIONS } from '../constants/quiz.constant';


@Injectable()
export class AssessmentService {

    constructor(private http: HttpClient) { }

    submitDataAndGetQuestions(content: string): Observable<Question[]> {
        let options = OPTIONS;
        let url = environment.API_HOST + environment.GENERATE_QUESTION_ENDPOINT;
        return this.http.post<Question[]>(url, { content, ...options }).pipe(map((data:any)=> data.questions));
    }

}

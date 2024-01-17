import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://www.balldontlie.io/api/v1/teams', () => {
    console.log('Intercepted');
    return HttpResponse.json({
      data: [
        { id: 1, full_name: 'Boston Celtics - mock' },
        { id: 2, full_name: 'Los Angeles Lakers - mock' },
      ],
    });
  }),
];

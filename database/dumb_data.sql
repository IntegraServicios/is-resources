INSERT INTO public.schedule (
    id,
    "mondayStartAt",
    "mondayEndAt",
    "tuesdayStartAt",
    "tuesdayEndAt",
    "wednesdayStartAt",
    "wednesdayEndAt",
    "thursdayStartAt",
    "thursdayEndAt",
    "fridayStartAt",
    "fridayEndAt",
    "saturdayStartAt",
    "saturdayEndAt",
    "sundayStartAt",
    "sundayEndAt"
  )
VALUES (
    DEFAULT,
    '10:00:00',
    '18:00:00',
    '10:00:00',
    '18:00:00',
    '10:00:00',
    '18:00:00',
    '10:00:00',
    '18:00:00',
    '10:00:00',
    '18:00:00',
    null,
    null,
    null,
    null
  );
INSERT INTO public.schedule (
    id,
    "mondayStartAt",
    "mondayEndAt",
    "tuesdayStartAt",
    "tuesdayEndAt",
    "wednesdayStartAt",
    "wednesdayEndAt",
    "thursdayStartAt",
    "thursdayEndAt",
    "fridayStartAt",
    "fridayEndAt",
    "saturdayStartAt",
    "saturdayEndAt",
    "sundayStartAt",
    "sundayEndAt"
  )
VALUES (
    DEFAULT,
    '11:00:00',
    '17:00:00',
    '11:00:00',
    '17:00:00',
    '11:00:00',
    '17:00:00',
    '11:00:00',
    '17:00:00',
    '11:00:00',
    '17:00:00',
    null,
    null,
    null,
    null
  );
INSERT INTO public.unit (id, schedule_id, name)
VALUES (DEFAULT, 1, 'Deportes');
INSERT INTO public.resource_type (
    id,
    name,
    description,
    schedule_id,
    "unitId",
    characteristics
  )
VALUES (
    DEFAULT,
    'Mesa de ping pong',
    'Mesa para uso publico',
    2,
    1,
    '{"capacity":  2}'
  );
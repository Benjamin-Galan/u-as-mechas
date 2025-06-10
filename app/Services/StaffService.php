<?php

namespace App\Services;

use App\Models\Staff;

class StaffService
{
    public function store(array $data)
    {
        if (isset($data)) {
            $staff = Staff::create($data);
        }

        return $staff;
    }

    public function update(Staff $staff, array $data)
    {
        $staff->update($data);
        return $staff;
    }

    public function destroy(Staff $staff)
    {
        return $staff->delete();
    }
}
